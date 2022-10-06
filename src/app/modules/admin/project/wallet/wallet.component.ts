import { Component } from '@angular/core';
import { Web3Service } from '../../../../core/web3/web3.service';

@Component({
    templateUrl: './wallet.component.html',
    styleUrls: ['./wallet.component.scss'],
})

export class WalletComponent {
    web3obj: {
        account: any;
        balance: any;
        block: any;
        blockNumber: any;
        code: any;
        gas_price: any;
        gas_estimate: any;
        transaction_receipt: any;
    } = {
        account: null,
        balance: null,
        block: null,
        blockNumber: null,
        code: null,
        gas_price: null,
        gas_estimate: null,
        transaction_receipt: null,
    }

    /**
     * @description
     * To see how the methods are implemented, please refer to a comment
     * documentation on the file Web3Service (web3.service.ts).
     */
    constructor(
        private _web3: Web3Service,
    ) { }

    public w3GetAccounts() {
        this._web3.getAccounts().then(response => {
            console.log('getAccounts: ', response);

            if (response) {
                this.web3obj.account = response;
            }
        });
    }

    public w3GetBlockNumber() {
        this._web3.getBlockNumber().then(response => {
            console.log('getBlockNumber: ', response);

            if (response) {
                this.web3obj.blockNumber = response;
            }
        });
    }

    public w3GetBlock() {
        this._web3.getBlock(this.web3obj.blockNumber, true).then(response => {
            console.log('getBlock: ', response);

            if (response) {
                this.web3obj.block = response;
            }
        });
    }

    public w3GetBalance() {
        this._web3.getBalance(this.web3obj.account[0]).then(response => {
            console.log('getBalance: ', response);

            if (response) {
                this.web3obj.balance = response;
            }
        });
    }

    public w3GetGasPrice() {
        this._web3.getGasPrice().then(response => {
            console.log('getGasPrice: ', response);

            if (response) {
                this.web3obj.gas_price = response;
            }
        });
    }

    public w3GetCode() {
        this._web3.getCode(this.web3obj.account[0], this.web3obj.blockNumber).then(response => {
            console.log('getCode: ', response);

            if (response) {
                this.web3obj.code = response;
            }
        });
    }

    public w3getTransactionReceipt() {
        const hashTest = '0x95c95fc977f1896aeab1fd1efbf4975220ac3c6c5d011dbe2c694edb7899f582';

        this._web3.getTransactionReceipt(hashTest).then(response => {
            console.log('getTransactionReceipt: ', response);

            if (response) {
                this.web3obj.transaction_receipt = response;
            }
        });
    }

    public w3EstimateGas() {
        this._web3.estimateGas({ from: this.web3obj.account[0] }).then(response => {
            console.log('estimateGas: ', response);

            if (response) {
                this.web3obj.gas_estimate = response;
            }
        });
    }

    public w3SendTransaction() {
        this._web3.sendTransaction(this.web3obj.account[0]).then(response => {
            console.log('sendTransaction: ', response);
        }).catch(error => {
            console.log('Fail to proceed transaction: ', error);
        });
    }
}
