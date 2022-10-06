import { Component, Inject } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { BreedCraftService } from "../../breed-craft.service";

@Component({
    templateUrl: 'create.component.html'
})

export class BreedDialogCreateComponent {
    public createForm: FormGroup;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        public dialogRef: MatDialogRef<BreedDialogCreateComponent>,
        private readonly _breedService: BreedCraftService,
    ) {
        this.createForm = new FormGroup({
            projectId: new FormControl(this.data.projectId, Validators.required),
            name: new FormControl(null, Validators.required),
        });
    }

    public onSubmit() {
        this.createForm.markAllAsTouched();
        this.createForm.updateValueAndValidity();

        if (this.createForm.invalid) {
        }

        this.createForm.disable();

        this._breedService.create(this.createForm.getRawValue()).then(response => {
            console.log('response create: ', response);
            if (response.status === 200) {
                this.dialogRef.close(response);
            }
        }).finally(() => {
            this.createForm.enable();
        });
    }
}
