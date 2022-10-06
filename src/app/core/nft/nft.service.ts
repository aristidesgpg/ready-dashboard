import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Web3Service } from '../web3/web3.service';
import { AbiItem } from 'web3-utils';
import { Observable } from 'rxjs';
import { NFTMetadata, NFTResponse } from './nft.type';
import { environment } from '../../../environments/environment';
import { environment as environmentProd} from '../../../environments/environment.prod';
import FuseBlockABI from "./fuseblockABI.json";
import ItemABI from "./itemABI.json";
import AuraABI from "./auraABI.json";

@Injectable({providedIn: 'root'})
export class NftService {
    private readonly _url: string = 'https://deep-index.moralis.io/api/v2';

    public init: Promise<any>;
    public auraContractInstance: any;
    public fuseBlockInstance: any;
    public itemInstance: any;

    public adminAddress = environment.smart_contract.adminAddress;
    public auraAddress = environment.smart_contract.auraAddress;
    public fuseBlockAddress = environment.smart_contract.fuseBlockAddress;
    public itemAddress = environment.smart_contract.itemAddress;
    public stakeAddress = environment.smart_contract.stakeAddress;

    constructor(
        private readonly _httpClient: HttpClient,
        private readonly _web3: Web3Service,
    ) {
        this.init = this.initialLoad();
    }

    private async initialLoad(): Promise<any> {
        return this.getChain().then(async res => {
            if (res === 'polygon') {
                this.auraAddress = environmentProd.smart_contract.auraAddress;
                this.fuseBlockAddress = environmentProd.smart_contract.fuseBlockAddress;
                this.itemAddress = environmentProd.smart_contract.itemAddress;
                this.stakeAddress = environmentProd.smart_contract.stakeAddress;
            }

            await this._web3.getWeb3().then(response => {
                this.fuseBlockInstance = new response.eth.Contract(FuseBlockABI as AbiItem[], this.fuseBlockAddress);
                this.itemInstance = new response.eth.Contract(ItemABI as AbiItem[], this.itemAddress);
                this.auraContractInstance = new response.eth.Contract(AuraABI as AbiItem[], this.auraAddress);
            });
        })
    }

    getNFTsForOwner(ownerAddress: string, tokenAddress: string, chain: string): Observable<NFTResponse> {
        try {
            const nfts = this._httpClient.get<NFTResponse>(
                `${this._url}/${ownerAddress}/nft/${tokenAddress}?chain=${chain}`, {
                    headers: {
                        "X-API-KEY":
                        "ak4ClPYq259ou7IVWWx1OmFr5xDHrzWHk9A3cwgpM1gXB0TBjZRHN7s8ViUZGQ4y",
                    },
                }
            );
            return nfts;
        } catch (err) { }
    }

    getAllNFTs(tokenAddress: string, chain: string): Observable<NFTResponse> {
        try {
            const nfts = this._httpClient.get<NFTResponse>(
                `${this._url}/nft/${tokenAddress}?chain=${chain}`, {
                    headers: {
                        "X-API-KEY":
                        "ak4ClPYq259ou7IVWWx1OmFr5xDHrzWHk9A3cwgpM1gXB0TBjZRHN7s8ViUZGQ4y",
                    },
                }
            );
            return nfts;
        } catch (err) { }
    }

    getMetaData(uuid: string): Observable<NFTMetadata> {
        try {
            const metadata = this._httpClient.get<NFTMetadata>(
                `https://us-central1-readysandbox.cloudfunctions.net/GetNFTMetadata?id=${uuid}`
            );
            return metadata;
        } catch (err) { }
    }

    public async getChain(): Promise<string> {
        const web3 = await this._web3.getWeb3();
        const networkId = await web3.eth.net.getId();

        return networkId === 80001 ? "mumbai" : "polygon";
    }

    public async getUserAddress(): Promise<string> {
        const accounts = await this._web3.getAccounts();
        return accounts[0];
    }
}
