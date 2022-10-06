import { Component } from '@angular/core';
import { BetaTestService } from '../../beta-test.service';

@Component({
    templateUrl: 'resume.component.html'
})

export class CampaignResumeComponent {
    public campaign: any;

    constructor(
        private readonly _betaTestService: BetaTestService,
    ) {
        this.campaign = this._betaTestService.campaign;
        console.log(this.campaign);
    }
}
