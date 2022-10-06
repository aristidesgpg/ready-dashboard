import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Web3Service } from '../../../../../../core/web3/web3.service';
import { WalletService } from '../../wallet.service';
import { Wallet, WalletProcess } from '../../wallet.type';

@Component({
    templateUrl: 'connect.component.html',
    styleUrls: ['connect.component.scss'],
})

export class DialogConnectComponent {
    public hasWeb3Support: boolean;
    public listMetamask: any[];
    public listRgn: any[];
    public process: WalletProcess = {} as WalletProcess;
    public rgnForm: FormGroup;
    public step: number = 1;
    public wallet: Wallet;

    constructor(
        public dialogRef: MatDialogRef<DialogConnectComponent>,
        private readonly _walletService: WalletService,
        private readonly _snackBar: MatSnackBar,
        private readonly _web3: Web3Service,
    ) {
        this.rgnForm = new FormGroup({
            password: new FormControl(null, Validators.required),
        });

        this.hasWeb3Support = this._walletService.hasWeb3Support;

        this._walletService.getWallet().subscribe(data => {
            this.wallet = data;
        });

        if (!this.wallet.isSelected) {
            this.step = 2;
        }
    }

    private connectToMetamask() {
        this.step = 3;

        this._web3.getAccounts()
            .then(response => {
                this.listMetamask = response;
            }).catch(error => {
                this.step = 2;
                this.process.init = false;

                const message = error.message
                    ? error.message
                    : 'Something went wrong, try again or connect manually';

                return this._snackBar.open(message, 'Ok');
            }).finally(() => {
                this.process.metamask = false;
            });
    }

    private connectToRgn() {
        this.step = 4;

        this._walletService.getRgnWallet()
            .then(response => {
                this.listRgn = response;
            }).catch(error => {
                this.step = 2;
                this.process.init = false;

                const message = error.message
                    ? error.message
                    : 'Something went wrong, try again or connect manually';

                return this._snackBar.open(message, 'Ok');
            }).finally(() => {
                this.process.rgn = false;
            });
    }

    public selectWalletType(wallet: 'metamask'|'rgn') {
        if (!this.hasWeb3Support && wallet === 'metamask') {
            return this._snackBar.open(
                'Metamask is not supported',
                'Ok'
            );
        }

        this.process.init = true;

        if (wallet === 'metamask') {
            this.process.metamask = true;
            return this.connectToMetamask();
        }

        if (wallet === 'rgn') {
            this.process.rgn = true;
            return this.connectToRgn();
        }
    }

    public selectMetamask(address: string) {
        this._walletService.setWallet(address, 'metamask');

        this.dialogRef.close();
    }

    public selectRgn(address: string) {
        this._walletService.setWallet(address, 'rgn');

        this.dialogRef.close();
    }

    public switchAccount() {
        this.step = 2;
    }

    public createRgnWallet() {
        if (this.rgnForm.invalid) {
            return this._snackBar.open(
                'Password is required',
                'Ok'
            );
        }

        this.rgnForm.disable();

        this._walletService.createRgnWallet(this.rgnForm.value.password)
            .then(response => {
                // Something went wrong or wallet is already created
                if (response.error) {
                    return this._snackBar.open(response.data.error, 'Ok');
                }

                // Created successfully
                if (response.success && response.wallet_created) {
                    this._snackBar.open('Wallet created successfully', 'Ok');
                    this.selectRgn(response.address);
                }
            }).catch(error => {
                return this._snackBar.open('Something went wrong, try again', 'Ok');
            }).finally(() => {
                this.rgnForm.enable();
            });
    }
}
