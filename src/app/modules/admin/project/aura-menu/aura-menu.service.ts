import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuraMenuType } from './aura.type';

@Injectable({
    providedIn: 'root'
})

export class AuraMenuService {
    constructor(
        private readonly _httpClient: HttpClient,
    ) { }

    /**
     * Get all Aura menus
     *
     * @returns Observable<AuraMenuType[]>
     */
    getAuraInfo(): Observable<AuraMenuType[]> {
        return this._httpClient.get<AuraMenuType[]>('api/apps/aura/aura-menu');
    }
}
