import { Component, Inject } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { map, Observable, startWith } from "rxjs";
import { BreedCraftService } from "../../breed-craft.service";

interface Type {
    recipeId: string;
    projectId: string;
    items: any[];
    type: 'required'|'rewarded';
}

@Component({
    templateUrl: 'add-item.component.html'
})

export class BreedDialogAddItemComponent {
    public filteredItems: Observable<any[]>;
    public createForm: FormGroup;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: Type,
        public dialogRef: MatDialogRef<BreedDialogAddItemComponent>,
        private readonly _breedService: BreedCraftService,
        private readonly _snackBar: MatSnackBar,
    ) {
        this.createForm = new FormGroup({
            recipeId: new FormControl(this.data.recipeId, Validators.required),
            projectId: new FormControl(this.data.projectId, Validators.required),
            itemId: new FormControl(null, Validators.required),
            amount: new FormControl(null, [Validators.required, Validators.min(1)]),
            consume: new FormControl(null),
        });

        this.filteredItems = this.createForm.get('itemId').valueChanges.pipe(
            startWith(''),
            map(value => this.filterItems(value || '')),
        );
    }

    private filterItems(value: string): any[] {
        const filterValue = value.toLowerCase().replace(/\s/g, '');

        return this.data.items.filter(option => {
            const filterOption = option.name.toLowerCase().replace(/\s/g, '');
            return filterOption.includes(filterValue);
        });
    }

    public displayFn(value?: string) {
        return value ? this.data.items.find(item => item.itemId === value).name : undefined;
    }

    public onSubmit() {
        this.createForm.markAllAsTouched();
        this.createForm.updateValueAndValidity();

        if (this.createForm.invalid) {
            this._snackBar.open('Form invalid', 'Ok');
        }

        this.createForm.disable();

        const fn = this.data.type === 'required' ? 'addRequiredItem' : 'addRewardedItem';

        this._breedService.addItem(this.createForm.getRawValue(), fn).then(response => {
            console.log('response add item: ', response);
            if (response.status === 200) {
                this.dialogRef.close(response);
            }
        }).finally(() => {
            this.createForm.enable();
        });
    }
}
