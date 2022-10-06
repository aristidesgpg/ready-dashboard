import { Component } from '@angular/core';
import { ActivatedRoute, ActivationEnd, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { BetaTestService } from '../beta-test.service';
import { Campaign } from '../beta-test.type';

@Component({
    templateUrl: 'campaign.component.html'
})

export class CampaignComponent {
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    public isLoaded: boolean;
    public title: string;
    public subtitle: string;
    public campaignMenu: any[];
    public campaign: Campaign;

    constructor(
        private readonly _route: ActivatedRoute,
        private readonly _router: Router,
        private readonly _betaTestService: BetaTestService,
    ) {
        this.campaignMenu = [
            { name: 'Resume', path: 'resume', icon: 'assignment' },
            { name: 'Reports', path: 'reports', icon: 'bug_report' },
        ];

        this.title = 'Campaign Detail';
        this.subtitle = 'Manage your campaign details and reports here';

        this._router.events
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((event) => {
                if (event instanceof ActivationEnd && event.snapshot.data.title) {
                    this.generateTitle(event);
                }
            });

        this._route.params
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(params => {
                this.loadData(params.campaignId)
            })
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    private async loadData(campaignId: string) {
        this._betaTestService
            .getCampaign(campaignId)
            .then((response: any) => {
                if (response.status === 200) {
                    this._betaTestService.campaign = response.payload;
                    this.campaign = response.payload;

                }
            }).finally(() => {
                this.isLoaded = true;
            });
    }

    /**
     * Generate the title and subtitle of the page.
     *
     * @param event ActivationEnd
     *
     * @returns void
     */
     private generateTitle(event: ActivationEnd): void {
        const data = event.snapshot.data;

        this.title = data.title ? data.title : this.title;
        this.subtitle = data.subtitle ? data.subtitle : this.subtitle;
    }
}
