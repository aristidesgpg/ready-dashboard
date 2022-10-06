import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Progress, RewardType } from './achievements.type';

@Injectable({
    providedIn: 'root'
})
export class AchievementsService {
  /**
   * Constructor
   */
  constructor(
    private _httpClient: HttpClient
  ) { }

  /**
   * Get all FAQs
   */
  getProgress(): Observable<Progress> {
    return this._httpClient.get<Progress>('api/apps/achievements/progress');
  }

  getRewardsCategories(): Observable<RewardType[]>  {
    return this._httpClient.get<RewardType[]>('api/apps/achievements/rewards');
  }
}
