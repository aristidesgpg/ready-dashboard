import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Leader, Leaderboard } from './leaderboard.type';

@Injectable({
    providedIn: 'root'
})
export class LeaderboardService
{
    /**
     * Constructor
     */
    constructor(
        private _httpClient: HttpClient
    ) { }


    /**
     * Get all Leaders
     */
    getAllLeaders(): Observable<Leaderboard[]> {
        return this._httpClient.get<Leaderboard[]>('api/apps/leaderboard/leaders');
    }

    getCurrentUser(): Observable<Leader> {
        return this._httpClient.get<Leader>('api/apps/leaderboard/profile');
    }
}
