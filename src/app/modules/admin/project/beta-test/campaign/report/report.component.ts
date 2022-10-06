import { Component } from '@angular/core';
import { BetaTestService } from '../../beta-test.service';
import { Campaign } from '../../beta-test.type';

@Component({
    templateUrl: 'report.component.html'
})

export class CampaignReportComponent {
    public campaign: Campaign;

    constructor(
        private readonly _betaTestService: BetaTestService,
    ) {
        this.campaign = this._betaTestService.campaign;
        console.log(this.campaign);
    }
}
