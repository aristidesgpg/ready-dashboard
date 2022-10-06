import { Injectable } from '@angular/core';
import { FuseMockApiService } from '@fuse/lib/mock-api';
import { rewards, selfProgress } from 'app/mock-api/apps/achievements/data';


@Injectable({
    providedIn: 'root'
})
export class AchievementsMockApi {
  /**
   * Constructor
   */
  constructor(private _fuseMockApiService: FuseMockApiService) {
    // Register Mock API handlers
    this.registerHandlers();
  }

  registerHandlers(): void {
    this._fuseMockApiService
      .onGet('api/apps/achievements/rewards')
      .reply(() => {
        return  [200, rewards];
      });

    this._fuseMockApiService
      .onGet('api/apps/achievements/progress')
      .reply(() => {
        return [200, selfProgress]
      })
  }
}