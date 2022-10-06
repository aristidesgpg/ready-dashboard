import { Component, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { FuseNavigationService } from '@fuse/components/navigation';
import { VirtualItemService } from './virtual-item.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { VirtualItem } from './virtual-item.type';

@Component({
  templateUrl: './virtual-item.component.html',
})

export class VirtualItemComponent implements OnDestroy {
    @ViewChild(MatSort) sort: MatSort;

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    public dataSource: MatTableDataSource<VirtualItem>;
    public displayedColumns: string[] = ['position', 'type', 'image', 'name', 'category', 'action'];
    public isLoaded: boolean = false;

    constructor (
        private readonly _liveAnnouncer: LiveAnnouncer,
        private readonly _navigationService: FuseNavigationService,
        private readonly _route: ActivatedRoute,
        private readonly _virtualItemService: VirtualItemService,
    ) {
        this._route.params
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(params => {
                let id = params['id'];
                this._navigationService.projectId = id;
                this.loadData();
            });
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    /**
     * Load initial data from Firebase.
     *
     * @returns Promise<void>
     */
    private async loadData(): Promise<void> {
        this._virtualItemService.getAllItems(this._navigationService.projectId)
            .then(response => {
                console.log('Response: ', response)

                this.dataSource = new MatTableDataSource(response);
                this.dataSource.sort = this.sort;

                this.isLoaded = true;
            });
    }

    /**
     * Sort the table based on a header cell.
     *
     * @param sortState
     *
     * @returns void
     */
    public announceSortChange(sortState: Sort): void {
        if (sortState.direction) {
            this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
        } else {
            this._liveAnnouncer.announce('Sorting cleared');
        }
    }
}
