import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { FuseNavigationService } from '../../../../../@fuse/components/navigation';
import { BetaTestService } from './beta-test.service';
import { BetaTestCampaigns } from './beta-test.type';

@Component({
    templateUrl: 'beta-test.component.html',
})

export class BetaTestComponent implements OnDestroy {
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    private _projectId: string;

    public isLoaded: boolean = false;
    public campaigns: BetaTestCampaigns[];

    constructor(
        private readonly _betaTestService: BetaTestService,
        private readonly _navigation: FuseNavigationService,
        private readonly _route: ActivatedRoute,
    ) {
        if (this._navigation.projectId) {
            this._projectId = this._navigation.projectId;
            this.loadData();
        } else {
            this._route.params
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(params => {
                console.log('params: ', params)

                const projectId = params['id'];
                this._navigation.projectId = projectId;
                this._projectId = projectId;

                this.loadData();
            });
        }
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    private async loadData(): Promise<void> {
        this._betaTestService.getAllCampaigns(this._projectId)
            .then(response => {
                this.campaigns = response;
                this.isLoaded = true;
            }).catch(error => {
                console.log('Error loadData: ', error)
            }).finally(() => {
                console.log('Finally loadData')
            });
    }
}
