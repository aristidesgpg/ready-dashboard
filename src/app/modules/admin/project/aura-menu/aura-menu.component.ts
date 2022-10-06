import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ActivationEnd, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { FuseNavigationService } from '@fuse/components/navigation';
import { AuraInfo, AuraMenuType } from './aura.type';
import { AuraMenuService } from './aura-menu.service';

@Component({
    templateUrl: './aura-menu.component.html',
    styleUrls: ['./aura-menu.component.scss']
})

export class AuraMenuComponent implements OnInit, OnDestroy {
    private readonly _unsubscribeAll: Subject<any> = new Subject<any>();

    public auraMenu: AuraMenuType[];
    public subtitle: string;
    public title: string;

    constructor(
        private readonly _auraMenuService: AuraMenuService,
        private readonly _navigationService: FuseNavigationService,
        private readonly _route: ActivatedRoute,
        private readonly _router: Router,
    ) {
        this._route.params.subscribe(params => {
            let id = params['id'];
            this._navigationService.projectId = id;
        });

        this._router.events.subscribe((event) => {
            if (event instanceof ActivationEnd && event.snapshot.data.title) {
                this.generateTitle(event);
            }
        });

        this.title = 'Aura';
        this.subtitle = 'Manage your Aura'; //Aura and Fuseblocks'
    }

    ngOnInit(): void {
        this._auraMenuService.getAuraInfo()
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(aura => {
                this.auraMenu = aura;
            });
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    /**
     * Generate the title and subtitle of the page.
     *
     * @param event ActivationEnd
     *
     * @returns void
     */
    private generateTitle(event: ActivationEnd): void {
        console.log('generateTitle: ', event);

        const data = event.snapshot.data;

        this.title = data.title ? data.title : this.title;
        this.subtitle = data.subtitle ? data.subtitle : this.subtitle;
    }
}
