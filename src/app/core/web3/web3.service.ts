import { Injectable } from '@angular/core';
import { provider } from 'web3-core';
import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3 from 'web3';
import Web3Modal from "web3modal";

@Injectable({
    providedIn: 'root'
})

export class Web3Service {
    private _web3js!: any;
    private _web3Modal!: any;
    private _provider: provider | undefined;

    /**
     * @description
     * This module is still under development. It's purpose is to test-only the
     * integration with Web3Js.
     *
     * @url
     * https://web3js.readthedocs.io/en/v1.7.3/getting-started.html
     *
     * So far, all the methods described on the web3js API have been working
     * with this integration.
     *
     * To add a new method, you just need to create the same web3js method on
     * the core service Web3Service and then call from the component where it's
     * needed.
     *
     * There may be some areas where we need to do some more work, as it's
     * still a work in progress integration.
     */
    constructor( ) {
        const providerOptions = {
            walletconnect: {
                package: WalletConnectProvider, // required
                options: {
                    infuraId: 'env', // required change this with your own infura id
                    description: 'Scan the qr code and sign in',
                    qrcodeModalOptions: {
                        mobileLinks: [
                            'rainbow',
                            'metamask',
                            'argent',
                            'trust',
                            'imtoken',
                            'pillar'
                        ]
                    }
                }
            },
            injected: {
                display: {
                    logo: 'https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg',
                    name: 'metamask',
                    description: "Connect with the provider in your Browser"
                },
                package: null
            },
        };

        this._web3Modal = new Web3Modal({
            network: "mainnet", // optional change this with the net you want to use like rinkeby etc
            cacheProvider: true, // optional
            providerOptions, // required
            theme: {
                background: "rgb(39, 49, 56)",
                main: "rgb(199, 199, 199)",
                secondary: "rgb(136, 136, 136)",
                border: "rgba(195, 195, 195, 0.14)",
                hover: "rgb(16, 26, 32)"
            }
        });
    }

    /**
     * Base connection method using Metamask.
     *
     * @return void
     */
    private async _conn(): Promise<void> {
        this._provider = await this._web3Modal.connect();
        this._web3js = new Web3(this._provider);
    }

    public getProvider(): provider {
        return this._provider;
    }

    public async getWeb3(): Promise<any> {
        if (!this._web3js) {
            await this._conn();
        }
        return this._web3js;
    }

    /**
     * Returns a list of accounts the node controls.
     *
     * @returns Promise<string>
     */
    public async getAccounts(): Promise<string[]> {
        await this._conn();

        return await this._web3js.eth.getAccounts();
    }

    /**
     * Returns the current block number.
     *
     * @returns Promise<string>
     */
    public async getBlockNumber(): Promise<string> {
        await this._conn();

        return await this._web3js.eth.getBlockNumber();
    }

    /**
     * Get the balance of an address at a given block.
     *
     * @param account The address to get the balance of
     * @param block (optional) If you pass this parameter it will not use the default block
     *
     * @returns Promise<number>
     */
    public async getBalance(account: string, block?: string | number): Promise<string> {
        await this._conn();

        const address = this._web3js.utils.toChecksumAddress(account);
        return await this._web3js.eth.getBalance(address, block);
    }

    /**
     * Get the storage at a specific position of an address.
     *
     * @param account The address to get the storage from
     * @param position The index position of the storage
     * @param block (optional) If you pass this parameter it will not use the default block
     *
     * @returns
     */
    public async getStorageAt(account: string, position: number, block?: string | number): Promise<string> {
        await this._conn();

        const address = this._web3js.utils.toChecksumAddress(account);

        return await this._web3js.eth.getStorageAt(address, position, block);
    }

    /**
     * Get the code at a specific address.
     *
     * @param account The address to get the code from
     * @param block (optional) If you pass this parameter it will not use the default block
     *
     * @returns
     */
    public async getCode(account: string, block?: string | number): Promise<string> {
        await this._conn();

        const address = this._web3js.utils.toChecksumAddress(account);

        return await this._web3js.eth.getCode(address, block);
    }

    /**
     * Returns a block matching the block number or block hash.
     *
     * @param blockNumber The block number or block hash
     * @param returnObject (optional, default false) If specified true, the returned block will contain all transactions as objects. If false it will only contains the transaction hashes.
     *
     * @returns Promise<{}|string>
     */
    public async getBlock(blockNumber: number | string, returnObject?: boolean): Promise<{} | string> {
        await this._conn();

        return await this._web3js.eth.getBlock(blockNumber, returnObject);
    }

    /**
     * Returns the current gas price oracle. The gas price is determined by the
     * last few blocks median gas price.
     *
     * @returns
     */
    public async getGasPrice(): Promise<string> {
        await this._conn();

        return await this._web3js.eth.getGasPrice();
    }

    /**
     * Returns the receipt of a transaction by transaction hash.
     *
     * @param hash The transaction hash
     *
     * @returns
     */
    public async getTransactionReceipt(hash: string): Promise<{}> {
        await this._conn();

        return await this._web3js.eth.getTransactionReceipt(hash);
    }

    /**
     * Returns the current gas price oracle. The gas price is determined by the
     * last few blocks median gas price.
     *
     * @returns
     */
    public async estimateGas(transactionObject: any): Promise<string> {
        await this._conn();

        return await this._web3js.eth.estimateGas(transactionObject);
    }

    /**
     * Returns the current gas price oracle. The gas price is determined by the
     * last few blocks median gas price.
     *
     * @returns
     */
    public async sendTransaction(account: string): Promise<string> {
        await this._conn();

        // Just to simulate a transaction, need to replace with real data
        const from = account; // "0xf628331402dC1a948A4e032bC9BbeF4C2257292c";
        const to = "0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506";
        const value = "10";

        const transactionObject: {
            from?: any;
            to?: any;
            value?: any;
        } = {
            from: this._web3js.utils.toChecksumAddress(from),
            to: this._web3js.utils.toChecksumAddress(to),
            value: this._web3js.utils.toWei(value),
        };

        return await this._web3js.eth.sendTransaction(transactionObject);
    }
}
