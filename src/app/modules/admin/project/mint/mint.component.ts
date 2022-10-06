import { Component, OnDestroy, OnInit } from '@angular/core';
import { forkJoin, Observable, Subject, takeUntil } from 'rxjs';
import { MintService } from './mint.service';
import { Web3Service } from '../../../../core/web3/web3.service';
import { fromWei } from 'web3-utils';
import { MintFuseblock, MintMinted } from './mint.type';
import { ActivatedRoute, Router } from '@angular/router';
import { NftService } from '../../../../core/nft/nft.service';

@Component({
    templateUrl: './mint.component.html',
})

export class MintComponent implements OnInit, OnDestroy {
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    public isLoadedFuseblock: boolean = false;
    public isLoadedMinted: boolean = false;

    public listFuseblock: MintFuseblock[] = [];
    public listMinted: MintMinted[] = [];

    public totalKarma: number;

    private readonly adminAddress: string;
    private readonly fuseAddress: string;
    private readonly itemAddress: string;
    private ownerAddress: string;

    private chain: string;

    constructor(
        private readonly _web3: Web3Service,
        private readonly _mintService: MintService,
        private readonly _router: Router,
        private readonly _route: ActivatedRoute,
        private readonly _nft: NftService,
    ) {
        this.adminAddress = this._nft.adminAddress;
        this.fuseAddress = this._nft.fuseBlockAddress;
        this.itemAddress = this._nft.itemAddress;
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
        this.ownerAddress = await this._nft.getUserAddress();
        this.chain = await this._nft.getChain();

        console.log('ownerAddress: ', this.ownerAddress)

        this.getTotalAmount();
        this.loadFuseblock();
        this.loadItem();
    }

    private async getTotalAmount() {
        const web3 = await this._web3.getWeb3();
        const auraContract = this._nft.auraContractInstance;

        const balance = await auraContract.methods.balanceOf(this.adminAddress).call();

        this.totalKarma = web3.utils.fromWei(balance)
        console.log('total karma: ', this.totalKarma)
    }

    private async loadFuseblock() {
        const fuseBlockInstance = this._nft.fuseBlockInstance;

        this._nft.getNFTsForOwner(this.ownerAddress, this.fuseAddress, this.chain)
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(async(nfts) => {
                const tokenIds = nfts.result.map(nft => nft.token_id);
                const tokensInfo = await fuseBlockInstance.methods.getFuseBlockInfo(tokenIds).call();
                const response = nfts.result.map((nft, i) =>  {
                    return {
                        id: nft.token_id,
                        name: `#${nft.token_id}`,
                        image: 'assets/images/ui/placeholder-fuseblock.png', // tokensInfo[1][i],
                        karma: parseFloat(fromWei(tokensInfo[0][i]))
                    }
                });

                this.listFuseblock = response;
                this.isLoadedFuseblock = true;
                console.log(this.listFuseblock);
            });
    }

    private async loadItem(): Promise<void> {
        const itemInstance = this._nft.itemInstance;

        this._nft.getNFTsForOwner(this.ownerAddress, this.itemAddress, this.chain)
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(async(nfts) => {
                const tokenIds = nfts.result.map(nft => nft.token_id);
                const len = tokenIds.length;
                const itemInfo = await itemInstance.methods.getItemsInfo(tokenIds).call();

                let quantity = [];
                let observables: Observable<any>[] = [];

                for (let i = 0; i < len; i ++) {
                    const balance = await itemInstance.methods.balanceOf(this.ownerAddress, tokenIds[i]).call();
                    quantity[i] = balance;

                    observables.push(this._nft.getMetaData(itemInfo[i].itemUUID));
                }

                forkJoin(observables).subscribe(response => {
                    response.forEach((item, index) => {
                        const img = item.image_url
                            ? item.image_url
                            : 'assets/images/ui/collection-item-placeholder.jpg'

                        this.listMinted.push({
                            id: tokenIds[index],
                            name: item.name,
                            image: img,
                            karma: Number(fromWei(itemInfo[index].auraAmount.toString())),
                            qty: Number(quantity[index]),
                        });
                    });
                });

                this.isLoadedMinted = true;
            });
    }

    public selectFuseblock(item: MintFuseblock): void {
        this._mintService.saveToLocalStorage(item);
        this._router.navigate([item.id], { relativeTo: this._route });
    }
}
