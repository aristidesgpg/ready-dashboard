import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { OverviewService } from 'app/modules/admin/project/overview/overview.service';
import { FaqCategory } from 'app/modules/admin/project/overview/overview.type';

@Component({
    selector     : 'faqs',
    templateUrl  : './faqs.component.html',
    encapsulation: ViewEncapsulation.None
})
export class FaqsComponent implements OnInit, OnDestroy
{
    faqCategories: FaqCategory[];
    private _unsubscribeAll: Subject<any> = new Subject();

    /**
     * Constructor
     */
    constructor(
      private _overviewService: OverviewService
    ) { }

    /**
     * On init
     */
    ngOnInit(): void
    {
        // Get the FAQs
        this._overviewService.getAllFaqs()
          .pipe(
            takeUntil(this._unsubscribeAll)
          )
          .subscribe((faqCategories) => {            
          this.faqCategories = faqCategories;
        });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index: number, item: any): any
    {
        return item.id || index;
    }
}
