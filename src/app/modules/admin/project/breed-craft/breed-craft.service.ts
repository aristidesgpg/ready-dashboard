import { Injectable } from '@angular/core';
import { AuthService } from '../../../../core/auth/auth.service';

@Injectable({
    providedIn: 'root'
})

export class BreedCraftService {
    constructor(
        private readonly _authService: AuthService,
    ) { }

    public async list(projectId: string): Promise<any> {
        const post = this._authService.readymasterApp
            .functions()
            .httpsCallable('breedCraft-list');

        return post({ projectId: projectId }).then(response => JSON.parse(response.data.response));
    }

    public async get(recipeId: string): Promise<any> {
        const post = this._authService.readymasterApp
            .functions()
            .httpsCallable('breedCraft-get');

        return post({ recipeId: recipeId }).then(response => JSON.parse(response.data.response));
    }

    public async create(data: any): Promise<any> {
        const post = this._authService.readymasterApp
            .functions()
            .httpsCallable('breedCraft-create');

        return post(data).then(response => JSON.parse(response.data.response));
    }

    public async update(data: any): Promise<any> {
        const post = this._authService.readymasterApp
            .functions()
            .httpsCallable('breedCraft-update');

        return post(data).then(response => JSON.parse(response.data.response));
    }

    public async addItem(data: any, fn: 'addRequiredItem'|'addRewardedItem'): Promise<any> {
        const post = this._authService.readymasterApp
            .functions()
            .httpsCallable(`breedCraft-${fn}`);

        return post(data).then(response => JSON.parse(response.data.response));
    }

    public async delete(recipeId: string): Promise<any> {
        const post = this._authService.readymasterApp
            .functions()
            .httpsCallable('breedCraft-delete');

        return post({ recipeId: recipeId }).then(response => JSON.parse(response.data.response));
    }
}
