import { Injectable } from '@angular/core';
import { FuseMockApiService } from '@fuse/lib/mock-api';
import { currentUser, leaderboard } from 'app/mock-api/apps/leaderboard/data';


@Injectable({
    providedIn: 'root'
})
export class LeaderboardMockApi
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
            .onGet('api/apps/leaderboard/leaders')
            .reply(() => {
                return  [200, leaderboard];
            });
        this._fuseMockApiService
            .onGet('api/apps/leaderboard/profile')
            .reply(() => {
                return  [200, currentUser];
            });
    }
}