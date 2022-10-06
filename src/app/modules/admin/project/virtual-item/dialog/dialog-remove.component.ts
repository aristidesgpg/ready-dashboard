import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { VirtualItemService } from '../virtual-item.service';
import { VirtualItem } from '../virtual-item.type';

@Component({
    templateUrl: 'dialog-remove.component.html',
})

export class DialogRemoveComponent {
    public onProcess: boolean = false;

    constructor(
        private readonly _virtualItemService: VirtualItemService,
        public dialogRef: MatDialogRef<DialogRemoveComponent>,
        @Inject(MAT_DIALOG_DATA) public data: VirtualItem,
    ) { }

    /**
     * Confirm item exclusion from Firebase
     *
     * @returns void
     */
    public confirm(): void {
        this.onProcess = true;

        this._virtualItemService.remove(this.data)
            .then(response => {
                console.log('Response remove: ', response)

                const result = JSON.parse(response.data.response);

                if (result.message === 'ok') {
                    this.dialogRef.close(result);
                }
            }).finally(() => {
                this.onProcess = false;
            });
    }
}
