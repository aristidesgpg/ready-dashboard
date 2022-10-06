// Angular
import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

// Angular Material
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

// Rxjs
import { Subject, takeUntil } from 'rxjs';

// Service
import { BreedCraftService } from '../../breed-craft.service';
import { VirtualItemService } from '../../../virtual-item/virtual-item.service';

// Component
import { BreedDialogAddItemComponent } from '../../dialog/add-required/add-item.component';

// Config
import { snackWarning } from 'app/core/config/snackbar.config';

@Component({
    templateUrl: 'item.component.html',
    styleUrls: ['item.component.scss'],
})

export class BreedItemComponent implements OnDestroy {
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    private _breed: any;
    private _projectId: string;
    private _recipeId: string;
    private _virtualItems: any[];

    public breed: any;
    public isLoaded: boolean = false;
    public itemForm: FormGroup;

    constructor(
        private readonly _breedService: BreedCraftService,
        private readonly _dialog: MatDialog,
        private readonly _route: ActivatedRoute,
        private readonly _snackBar: MatSnackBar,
        private readonly _virtualService: VirtualItemService,
    ) {
        this.itemForm = new FormGroup({
            id: new FormControl(null, Validators.required),
            name: new FormControl(null, Validators.required),
            mustConsumeAll: new FormControl(null),
        });

        this._route.parent.params
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(params => {
                this._projectId = params.id;
            });

        this._route.params
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(params => {
                this._recipeId = params.id;

                this.loadData()
            });
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    private loadData() {
        Promise.all([
            this._breedService.get(this._recipeId),
            this._virtualService.getAllItems(this._projectId)
        ]).then(result => {
            console.log('Result load: ', result);

            if (result[0]) {
                this.breed = result[0].payload;
                this._breed = JSON.parse(JSON.stringify(result[0]));
            }

            this._virtualItems = result[1];

            this.resetForm();
            this.isLoaded = true;
        });
    }

    private resetForm() {
        this.itemForm.reset(this.breed);
    }

    public onSubmit() {
        this.itemForm.markAllAsTouched();
        this.itemForm.updateValueAndValidity();

        if (this.itemForm.invalid) {
            return this._snackBar.open('Form is invalid', 'ok', snackWarning);
        }

        this.itemForm.disable();

        this._breedService
            .update(this.itemForm.getRawValue())
            .then(result => {
                console.log('Result: ', result);
            }).finally(() => {
                this.itemForm.enable();
            });
    }

    public addRequiredItem() {
        const dialogRef = this._dialog.open(BreedDialogAddItemComponent, {
            maxWidth: '700px',
            width: '100%',
            autoFocus: true,
            disableClose: true,
            data: {
                recipeId: this._recipeId,
                projectId: this._projectId,
                items: this._virtualItems,
                type: 'required'
            }
        });

        dialogRef
            .afterClosed()
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(result => {
                console.log('result close add item')
                if (result && result.status === 200) {
                    this.breed.requiredVirtualItems.push(result.payload);
                }
            });
    }

    public addRewardedItem() {
        const dialogRef = this._dialog.open(BreedDialogAddItemComponent, {
            maxWidth: '700px',
            width: '100%',
            autoFocus: true,
            disableClose: true,
            data: {
                recipeId: this._recipeId,
                projectId: this._projectId,
                items: this._virtualItems,
                type: 'rewarded'
            }
        });

        dialogRef
            .afterClosed()
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(result => {
                console.log('result close add item')
                if (result && result.status === 200) {
                    this.breed.rewardedVirtualItems.push(result.payload);
                }
            });
    }
}
