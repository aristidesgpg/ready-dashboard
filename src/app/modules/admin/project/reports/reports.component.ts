import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Subject, takeUntil } from "rxjs";
import { FuseNavigationService } from "../../../../../@fuse/components/navigation";
import { ReportsService } from "./reports.service";

@Component({
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
})

export class ReportsComponent {
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    private _projectId: string;

    public reports: any[];
    public isLoaded: boolean = false;

    constructor(
        private readonly _reportsService: ReportsService,
        private readonly _route: ActivatedRoute,
        private readonly _navigation: FuseNavigationService,
    ) {
        if (this._navigation.projectId) {
            this._projectId = this._navigation.projectId;
            this.loadData();
        } else {
            this._route.params
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(params => {
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
        console.log('projectId: ', this._projectId);

        this._reportsService.getAllReports(this._projectId)
            .then((response: any) => {
                this.reports = response.payload;
                this.isLoaded = true;
            }).catch(error => {
                console.log('Error loadData: ', error)
            }).finally(() => {
                console.log('Finally loadData')
            });
    }
}
