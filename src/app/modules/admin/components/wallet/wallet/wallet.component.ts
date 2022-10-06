import { Component } from '@angular/core';
import { WalletService } from '../wallet.service';
import { Wallet } from '../wallet.type';

@Component({
    selector: 'ready-wallet',
    templateUrl: 'wallet.component.html',
    styleUrls: ['wallet.component.scss'],
})

export class WalletComponent {
    public isLoading: boolean;
    public wallet: Wallet;

    constructor(
        private readonly _walletService: WalletService,
    ) {
        this._walletService.getWallet().subscribe(data => {
            this.wallet = data;
        });
    }

    public connectWallet() {
        this.isLoading = true;

        this._walletService.connectWallet().subscribe(response => {
            console.log(response)

            this.isLoading = false;
        });
    }
}
