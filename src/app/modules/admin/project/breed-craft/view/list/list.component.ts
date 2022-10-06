// Angular
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// Angular Material
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

// Rxjs
import { Subject, takeUntil } from 'rxjs';

// Service
import { BreedCraftService } from '../../breed-craft.service';

// Component
import { BreedDialogCreateComponent } from '../../dialog/create/create.component';

// Config
import { snackWarning } from 'app/core/config/snackbar.config';

@Component({
    templateUrl: 'list.component.html',
    styles: [`
        .list_item {
            background: linear-gradient(0deg, rgba(0,0,0,.8), rgba(0,0,0,0));
        }
    `],
})

export class BreedListComponent {
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    private projectId: string;

    public list: any[] = [];
    public isLoaded: boolean = false;

    constructor(
        private readonly _breedService: BreedCraftService,
        private readonly _route: ActivatedRoute,
        private readonly _dialog: MatDialog,
        private readonly _router: Router,
        private readonly _snackBar: MatSnackBar,
    ) {
        this._route.params
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(params => {
                this.projectId = params.id;
                this.loadData();
            });
    }

    private loadData() {
        this._breedService.list(this.projectId).then(response => {
            console.log('Response on list: ', response)

            if (response.status !== 200) {
                return this._snackBar.open(response.message, 'Ok', snackWarning);
            }

            this.list = response.payload;
            this.isLoaded = true;
        })
    }

    public createRecipe() {
        const dialogRef = this._dialog.open(BreedDialogCreateComponent, {
            maxWidth: '700px',
            width: '100%',
            autoFocus: true,
            disableClose: true,
            data: { projectId: this.projectId }
        });

        dialogRef
            .afterClosed()
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(result => {
                if (result && result.status === 200) {
                    console.log('result inside list: ', result.payload);
                    this._router.navigate([result.payload], { relativeTo: this._route });
                }
            });
    }
}
