import { Injectable } from '@angular/core';
import { FuseMockApiService } from '@fuse/lib/mock-api';
// import { cloneDeep } from 'lodash';
// import { fuseblock, minted, process } from './data';


@Injectable({
    providedIn: 'root'
})
export class MintMockApi
{
    /**
     * Constructor
     */
    constructor(private _fuseMockApiService: FuseMockApiService)
    {
        // Register Mock API handlers
        this.registerHandlers();
    }

    registerHandlers(): void {
        // this._fuseMockApiService
        //     .onGet('api/apps/mint/fuseblock')
        //     .reply(() => {
        //         return  [200, fuseblock];
        //     });

        // this._fuseMockApiService
        //     .onGet('api/apps/mint/process')
        //     .reply(() => {
        //         return  [200, process];
        //     });

        // this._fuseMockApiService
        //     .onGet('api/apps/mint/minted')
        //     .reply(() => {
        //         return  [200, minted];
        //     });

        // this._fuseMockApiService
        //     .onGet('api/apps/mint/fuseblock/single')
        //     .reply(({request}) => {
        //         // Get the id from the params
        //         const id = request.params.get('id');

        //         // Clone the fuseblocks
        //         const list = cloneDeep(fuseblock);

        //         // Find the course and attach steps to it
        //         const fuse = list.find(item => item.id === id);

        //         if (!fuse) {
        //             return [404, null];
        //         }

        //         return [200, fuse];
        //     });
    }
}
