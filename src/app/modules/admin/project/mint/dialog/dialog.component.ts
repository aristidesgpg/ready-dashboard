import { toWei } from 'web3-utils';
import { AfterViewInit, Component, Inject, OnDestroy, ViewEncapsulation } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatSnackBar, MatSnackBarRef, TextOnlySnackBar } from '@angular/material/snack-bar';
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';
import { NftService } from '../../../../../core/nft/nft.service';

@Component({
    templateUrl: 'dialog.component.html',
    styleUrls: ['dialog.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class MintDialogComponent implements AfterViewInit, OnDestroy {
    private readonly _unsubscribeAll: Subject<any> = new Subject<any>();

    public readonly mintForm: FormGroup;

    constructor(
        public dialogRef: MatDialogRef<MintDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private readonly _snackBar: MatSnackBar,
        private readonly _nft: NftService,
    ) {
        this.mintForm = new FormGroup({
            nft: new FormControl(null, Validators.required),
            karma: new FormControl(null, Validators.required),
            total: new FormControl(0, Validators.required),
        });

        this.mintForm.controls['nft'].valueChanges
            .pipe(
                debounceTime(250),
                distinctUntilChanged(),
                takeUntil(this._unsubscribeAll)
            )
            .subscribe((value: any) => {
                this.checkTotal();
            });

        this.mintForm.controls['karma'].valueChanges
            .pipe(
                debounceTime(250),
                distinctUntilChanged(),
                takeUntil(this._unsubscribeAll)
            )
            .subscribe((value: any) => {
                this.checkTotal();
            });
    }

    public ngAfterViewInit() {
        this.mintForm.controls.total.addValidators(
            [Validators.max(this.data.fuseblock.remaining)]
        );
    }

    public ngOnDestroy(): void {
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    /**
     * Check if the total amount of $karme used is available.
     *
     * @returns void
     */
    private checkTotal(): void {
        let amountNft = this.mintForm.value.nft;
        let amountKarma = this.mintForm.value.karma;

        if (!amountNft || !amountKarma) {
            return null;
        }

        amountNft = Number(amountNft);
        amountKarma = Number(amountKarma);
        const total = amountNft * amountKarma;

        this.mintForm.patchValue({ total: total });
        this.mintForm.markAllAsTouched();
    }

    /**
     * Cancel and close the dialog.
     *
     * @returns void
     */
    public onCancel(): void {
        this.dialogRef.close();
    }

    /**
     * Confirm item to be added.
     *
     * @returns void
     */
    public async onConfirm(): Promise<MatSnackBarRef<TextOnlySnackBar>|void> {
        if (this.mintForm.controls.karma.value == 0) {
            return this._snackBar.open(
                'The amount of $karma can\'t be 0',
                'Ok',
                { panelClass: ['dialog_snackbar'] }
            );
        }

        if (this.mintForm.controls.total.value > this.data.fuseblock.remaining) {
            return this._snackBar.open(
                'The amount of $karma used exceed the remaining amount available',
                'Ok',
                { panelClass: ['dialog_snackbar'] }
            );
        }

        if (this.mintForm.invalid) return;

        this.mintForm.disable();

        const fuseBlockInstance = this._nft.fuseBlockInstance;
        const userAddress = await this._nft.getUserAddress();

        // second parameter should be matched with item id. So I recommend the item it is number, not string.
        await fuseBlockInstance.methods.mintItem(this.data.fuseblock.tokenId, this.data.item.itemId, parseInt(this.mintForm.controls.nft.value), toWei(this.mintForm.controls.karma.value)).send({from: userAddress})
            .on('transactionHash', function(hash){
                console.log('transaction hash')
                console.log(hash)
            })

            .on('receipt', (response: any) => {
                console.log('on response confirmation: ', response)

                this.dialogRef.close(this.mintForm.value);
            })

            .on('confirmation', function(confirmationNumber, receipt){
                console.log('confirmation')
                console.log(confirmationNumber)
                console.log(receipt)
            })

            .on('error', (error: any) => {
                console.log('on response error: ', error)

                this.mintForm.enable();

                return this._snackBar.open(
                    error.message ? error.message : 'Something went wrong',
                    'Ok',
                    { panelClass: ['dialog_snackbar-error'] }
                );
            });
    }
}
