import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { Web3Service } from '../../../../core/web3/web3.service';
import { toWei } from 'web3-utils';
import { MintFuseblock } from '../mint/mint.type';
import { Subject, takeUntil } from 'rxjs';
import { fromWei } from 'web3-utils';
import { MatDialog } from '@angular/material/dialog';
import { MintDialogCancelFuseblockComponent } from '../mint/dialog/cancel/cancel-fuseblock.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NftService } from '../../../../core/nft/nft.service';

@Component({
    templateUrl: './fuseblock.component.html',
    styleUrls: ['./fuseblock.component.scss'],
    encapsulation: ViewEncapsulation.None,
})

export class FuseBlockComponent implements OnInit, OnDestroy {
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    private _chain: string;
    private _fuseblockInstance: any;
    private _auraInstance: any;

    private _userAddress: string;
    private _adminAddress: string;
    private _fuseAddress: string;

    public isConnected: boolean = false;
    public isLoadedFuseblock: boolean = false;
    public listFuseblock: MintFuseblock[] = [];

    totalKarma: number;
    verticalStepperForm: FormGroup;
    web3obj: {
        account: any;
        balance: any;
        block: any;
        blockNumber: any;
        code: any;
        gas_price: any;
    } = {
        account: null,
        balance: null,
        block: null,
        blockNumber: null,
        code: null,
        gas_price: null,
    };

    constructor(
        private readonly _web3: Web3Service,
        private readonly _dialog: MatDialog,
        private readonly _snackBar: MatSnackBar,
        private readonly _nft: NftService,
    ) {
        this.verticalStepperForm = new FormGroup({
            developer_address: new FormControl(''),
            amount: new FormControl(''),
        });

        this._adminAddress = this._nft.adminAddress;
        this._fuseAddress = this._nft.fuseBlockAddress;
    }

    ngOnInit(): void {
        this._nft.init.then(res => {
            this.loadData();
        });
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    private async loadData() {
        this._chain = await this._nft.getChain();
        this._userAddress = await this._nft.getUserAddress();
        this._fuseblockInstance = await this._nft.fuseBlockInstance;
        this._auraInstance = await this._nft.auraContractInstance;

        this.loadFuseblock();
    }

    private async loadFuseblock() {
        this._nft.getAllNFTs(this._fuseAddress, this._chain)
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(async (nfts) => {
                const tokenIds = nfts.result.map(nft => nft.token_id);
                const tokensInfo = await this._fuseblockInstance.methods.getFuseBlockInfo(tokenIds).call();
                const response = nfts.result.map((nft, i) => {
                    return {
                        id: nft.token_id,
                        name: `#${nft.token_id}`,
                        image: 'assets/images/ui/placeholder-fuseblock.png', // tokensInfo[1][i],
                        qty: parseFloat(fromWei(tokensInfo[0][i]))
                    }
                });

                response.sort((a, b) => (a.id < b.id ? -1 : 1));

                this.listFuseblock = response;
                this.isLoadedFuseblock = true;

                console.log(this.listFuseblock)
            });
    }

    async connectWallet() {
        const web3 = await this._web3.getWeb3();
        const balance = await this._auraInstance.methods.balanceOf(this._adminAddress).call();
        console.log('total balance: ', balance)

        const balanceFormat = web3.utils.fromWei(balance)
        console.log('total balance: ', balanceFormat)

        this.isConnected = true;
        this.totalKarma = balanceFormat;
    }

    async mintFuseBlock() {
        if (!this._fuseblockInstance) {
            this.connectWallet();
        } else {
            const adminAddress = await this._nft.getUserAddress();
            const developer_address = this.verticalStepperForm.get('developer_address').value;
            const amount = this.verticalStepperForm.get('amount').value;
            await this._fuseblockInstance.methods.mint(developer_address, toWei(amount.toString())).send({ from: adminAddress });
        }
    }

    public cancelFuseBlock(fuseblock: MintFuseblock): void {
        const dialogRef = this._dialog.open(MintDialogCancelFuseblockComponent, {
            maxWidth: '600px',
            width: '100%',
            autoFocus: true,
            disableClose: true,
            data: fuseblock,
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

    public async setRequirementStatus(fuseblock: MintFuseblock): Promise<void> {
        await this._fuseblockInstance.methods
            .setRequirementStatus(parseInt(fuseblock.id), true)
            .send({from: this._userAddress})
            .on('receipt', (response: any) => {
                console.log('on receipt: ', response)
            })
            .on('error', (error: any) => {
                console.log('on error: ', error)
            });
    }
}
