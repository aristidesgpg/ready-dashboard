import { Injectable } from '@angular/core';
import { FuseMockApiService } from '@fuse/lib/mock-api';
import { auraMenu } from 'app/mock-api/apps/aura/data';


@Injectable({
    providedIn: 'root'
})
export class AuraMenuMockApi {
  /**
   * Constructor
   */
  constructor(private _fuseMockApiService: FuseMockApiService) {
    // Register Mock API handlers
    this.registerHandlers();
  }

  registerHandlers(): void {
    this._fuseMockApiService
      .onGet('api/apps/aura/aura-menu')
      .reply(() => {
        return  [200, auraMenu];
      });
  }
}