import { Component, OnDestroy, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { cloneDeep } from 'lodash';
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';
import { MintDialogComponent } from '../dialog/dialog.component';
import { MintService } from '../mint.service';
import { MintFuseblock, MintItem } from '../mint.type';
import { MatSnackBar, MatSnackBarRef, TextOnlySnackBar } from '@angular/material/snack-bar';
import { FuseNavigationService } from '../../../../../../@fuse/components/navigation';
import { MintDialogCancelFuseblockComponent } from '../dialog/cancel/cancel-fuseblock.component';
import { VirtualItemService } from '../../virtual-item/virtual-item.service';
import { NftService } from '../../../../../core/nft/nft.service';

@Component({
    templateUrl: 'new.component.html',
    styleUrls: ['new.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class MintNewComponent implements OnDestroy {
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    private _listItems: MintItem[];

    public readonly searchForm: FormGroup;

    public isLoaded: boolean = false;
    public isFound: boolean = false;
    public fuseblock!: MintFuseblock;
    public listItems: MintItem[];
    public listSelected: {
        total: number;
        tokenId: number;
        remaining: number;
        items: MintItem[];
    } = {
        tokenId: 0,
        total: 0,
        remaining: 0,
        items: [],
    };

    constructor(
        private readonly _route: ActivatedRoute,
        private readonly _mintService: MintService,
        private readonly _virtualItemService: VirtualItemService,
        private readonly _snackBar: MatSnackBar,
        private readonly _navigationService: FuseNavigationService,
        private readonly _dialog: MatDialog,
        private readonly _nft: NftService,
    ) {
        this._route.params
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(params => {
                let projectId = params['id'];
                let fuseblockId = params['fuseblock']

                this._navigationService.projectId = projectId;

                this.loadData(projectId, fuseblockId);
            });

        this.searchForm = new FormGroup({
            search: new FormControl(null),
        });

        this.searchForm.controls['search'].valueChanges
            .pipe(
                debounceTime(500),
                distinctUntilChanged(),
                takeUntil(this._unsubscribeAll)
            )
            .subscribe((value: any) => {
                this.onSearch(value);
            });
    }

    public ngOnDestroy(): void {
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    /**
     * Load item details from the database based on item id.
     *
     * @returns void
     */
    private loadData(projectId: string, fuseblockId: string): void {
        /**
         * Instead of api call, get fuseblock from localStorage
         *
         * @todo
         * Validate fuseblockId of the url with the localStorage
         */
        this.fuseblock = this._mintService.getFromLocalStorage();
        console.log(this.fuseblock);

        // Load virtual items from Firebase
        this._mintService
        .getAllVirtualItems(projectId).then(result => {
            this._listItems = cloneDeep(result);
            this.listItems = result;

            this.listSelected.tokenId = parseInt(this.fuseblock.id);
            this.listSelected.total = this.fuseblock.karma;
            this.listSelected.remaining = this.fuseblock.karma;

            this.isLoaded = true;
        });
    }

    /**
     * Set the requirements meet true or false
     *
     * @returns void
     */
    public async setRequirementStatus(): Promise<void> {
        const fuseblockInstance = this._nft.fuseBlockInstance;
        const userAddress = await this._nft.getUserAddress();

        // only admin can cancel the fuseBlock;
        await fuseblockInstance.methods
            .setRequirementStatus(parseInt(this.fuseblock.id), true)
            .send({from: userAddress})
            .on('receipt', (response: any) => {
                console.log('on receipt: ', response)
            })
            .on('error', (error: any) => {
                console.log('on error: ', error)
            });
    }

    /**
     * Search the list of Virtual Goods based on a search term.
     *
     * @param value Search term
     *
     * @returns void
     */
    private onSearch(value: string): void {
        const nValue = this._mintService.convertString(value);

        this.listItems = this._listItems.filter(item => {
            const name = this._mintService.convertString(item.name);
            return name.includes(nValue);
        });
    }

    /**
     * Add one new item to the selected list.
     *
     * @param item Item to be added
     *
     * @returns void
     */
    private transferToSelected(item: MintItem): void {
        const nItem = Object.assign({}, item);
        const index = this._listItems.findIndex(list => list.itemId === item.itemId);

        this.listSelected.items.push(nItem);

        this._listItems.splice(index, 1);
        this.listItems = cloneDeep(this._listItems);

        this.calculateRemaining();
        this.searchForm.reset();
    }

    /**
     * Remove one item from the selected list.
     *
     * @param item Item to be removed
     * @param index Position on the array
     *
     * @returns void
     */
    private removeFromSelected(item: MintItem, index: number): void {
        const nItem = Object.assign({}, item);
        delete nItem.karma;
        delete nItem.nft;

        this._listItems.push(nItem);
        this.listItems = cloneDeep(this._listItems);

        this.listSelected.items.splice(index, 1);

        this.calculateRemaining();
        this.searchForm.reset();
    }

    /**
     * Calculate the remaining $karma the fuseblock has to use.
     *
     * @returns void
     */
    private calculateRemaining(): void {
        let count = Number(this.listSelected.total);

        this.listSelected.items.forEach(item => {
            count = count - Number(item.karma);
        });

        this.listSelected.remaining = Math.floor(count * 100) / 100;
    }

    /**
     * Update item on Firebase after a mint process completes successfully.
     *
     * @param item Item minted
     * @param minted Minting values (qty)
     *
     * @returns void
     */
    private setItemNft(item: MintItem, minted: any): void {
        const nItem: MintItem = {
            ...item,
            isNFT: true,
            totalQuantity: Number(minted.nft),
        }

        this._virtualItemService.update(nItem);
    }

    /**
     * Select an item to add to the mint process.
     *
     * @param item
     *
     * @returns void
     */
    public selectItem(item: MintItem): void|MatSnackBarRef<TextOnlySnackBar> {
        if (!this.listSelected.remaining || this.listSelected.remaining <= 0) {
            return this._snackBar.open(
                'You don`t have $karma available for a new item',
                'Ok',
                { panelClass: ['mint_snackbar'] }
            );
        }

        const dialogRef = this._dialog.open(MintDialogComponent, {
            maxWidth: '700px',
            width: '100%',
            autoFocus: true,
            disableClose: true,
            data: {
                fuseblock: this.listSelected,
                item: item,
            },
        });

        dialogRef
            .afterClosed()
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(result => {
                if (result) {
                    this.setItemNft(item, result);
                    this.transferToSelected({...item, ...result});
                }
            });
    }

    /**
     * Remove one selected item.
     *
     * @param item Item to be removed
     * @param index Position on the array
     *
     * @returns void
     */
    public removeItem(item: MintItem, index: number): void {
        this.removeFromSelected(item, index);
    }

    /**
     * Cancel Fuseblock
     *
     * @returns void
     */
     public cancelFuseBlock(): void {
        const dialogRef = this._dialog.open(MintDialogCancelFuseblockComponent, {
            maxWidth: '600px',
            width: '100%',
            autoFocus: true,
            disableClose: true,
            data: this.fuseblock,
        });

        dialogRef
            .afterClosed()
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(result => {
                if (result) {
                    return this._snackBar.open(
                        'Fuseblock canceled successfully',
                        'Ok',
                        { panelClass: ['mint_snackbar'] }
                    );
                }
            });
    }
}
