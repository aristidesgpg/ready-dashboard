import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, ReplaySubject } from 'rxjs';
import { FaqCategory } from 'app/modules/admin/project/overview/overview.type';

@Injectable({
    providedIn: 'root'
})
export class OverviewService
{
    private _faqs: ReplaySubject<FaqCategory[]> = new ReplaySubject<FaqCategory[]>(1);
    /**
     * Constructor
     */
    constructor(
			private _httpClient: HttpClient
		) { }

    /**
     * Getter for FAQs
     */
    get faqs$(): Observable<FaqCategory[]>
    {
        return this._faqs.asObservable();
    }

    /**
     * Get all FAQs
     */
    getAllFaqs(): Observable<FaqCategory[]>
    {
        return this._httpClient.get<FaqCategory[]>('api/apps/help-center/faqs');
    }

    /**
     * Get FAQs by category using category slug
     *
     * @param slug
     */
    getFaqsByCategory(slug: string): Observable<FaqCategory[]>
    {
        return this._httpClient.get<FaqCategory[]>('api/apps/help-center/faqs', {
            params: {slug}
        });
    }
}
