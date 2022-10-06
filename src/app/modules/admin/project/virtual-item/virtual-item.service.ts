import { Injectable } from '@angular/core';
import { AuthService } from '../../../../core/auth/auth.service';
import { VirtualItem } from './virtual-item.type';

@Injectable({
    providedIn: 'root'
})

export class VirtualItemService {
    constructor(
        private readonly _authService: AuthService,
    ) { }

    private convertToNumber(value: any) {
        let newField = parseInt(value);
        return isNaN(newField) ? 0 : newField;
    }

    /**
     * Get all virtual items from current projectId.
     *
     * @param projectId
     *
     * @returns Promise<VirtualItem[]>
     */
    public async getAllItems(projectId: string): Promise<VirtualItem[]> {
        let querySnapshot = await this._authService.readymasterApp
            .firestore()
            .collection('virtual-items')
            .where('purchasableRGNAppId', '==', projectId)
            .get();

        return querySnapshot.docs.map(doc => {
            let data = doc.data();

            return data;
        }) as VirtualItem[];
    }

    /**
     * Get a single item based on the unique ID
     *
     * @param itemId Item unique id on Firebase
     *
     * @returns Promise<VirtualItem>
     */
    public async getItem(itemId: string): Promise<VirtualItem> {
        return this._authService.readymasterApp
            .firestore()
            .collection('virtual-items')
            .doc(itemId)
            .get().then(response => {
                return response.data() as VirtualItem
            });
    }

    /**
     * Create a new Virtual Item on Firebase.
     *
     * @param data VirtualItem
     *
     * @returns Promise<any>
     */
    public async create(data: VirtualItem): Promise<any> {
        data.price = this.convertToNumber(data.price);

        const post = this._authService.readymasterApp
            .functions()
            .httpsCallable('virtualItems-add');

        return post(data).then(response => JSON.parse(response.data.response));
    }

    /**
     * Update a Virtual Item on Firebase.
     *
     * @param data VirtualItem
     *
     * @returns Promise<any>
     */
    public async update(data: VirtualItem): Promise<any> {
        data.price = this.convertToNumber(data.price);

        const post = this._authService.readymasterApp
            .functions()
            .httpsCallable('virtualItems-update');

        return post(data).then(response => response);
    }

    /**
     * Remove on item from this project on Firebase.
     *
     * @param data VirtualItem
     *
     * @returns Promise<any>
     */
    public async remove(data: VirtualItem) {
        const nData = {
            itemId: data.itemId,
            purchasableRGNAppId: data.purchasableRGNAppId,
        }

        const post = this._authService.readymasterApp
            .functions()
            .httpsCallable('virtualItems-delete');

        return post(nData).then(response => response);
    }
}
