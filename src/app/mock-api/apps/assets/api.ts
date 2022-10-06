import { Injectable } from '@angular/core';
import { FuseMockApiService } from '@fuse/lib/mock-api';
import { assetsList } from 'app/mock-api/apps/assets/data';

@Injectable({
    providedIn: 'root'
})
export class AssetsMockApi
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
        this._fuseMockApiService
            .onGet('api/apps/assets/list')
            .reply(() => {
                return  [200, assetsList];
            });

        this._fuseMockApiService
            .onGet('api/apps/assets/item')
            .reply(({request}) => {
                // Get the id from the params
                const id = request.params.get('id');

                // Find the item
                const item = assetsList.items.filter(item => item.id === id);

                // Manage the response
                const response = item ? item[0] : null;

                // Return the response
                return [200, response];
            });
    }
}
