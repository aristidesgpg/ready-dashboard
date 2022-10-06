import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { FuseNavigationService } from '@fuse/components/navigation';
import { VirtualItemService } from '../virtual-item.service';
import { VirtualItem } from '../virtual-item.type';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FuseAlertType } from '@fuse/components/alert';
import { MatDialog } from '@angular/material/dialog';
import { DialogRemoveComponent } from '../dialog/dialog-remove.component';
import { fuseAnimations } from '../../../../../../@fuse/animations';
import { environment } from '../../../../../../environments/environment';
import { UploaderComponent } from '../../../components/uploader/uploader.component';

@Component({
    templateUrl: './item.component.html',
    styleUrls: ['./item.component.scss'],
    animations: fuseAnimations,
})

export class AssetsManageComponent implements OnDestroy {
    @ViewChild('alertBox') alertBox: ElementRef;
    @ViewChild('uploader') uploader: UploaderComponent;

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    public readonly uploadUrl: string;

    public alert: { type: FuseAlertType; message: string } = { type: null, message: null };
    public btnLabel: 'Create' | 'Update';
    public imageUrl: string;
    public isLoaded: boolean = false;
    public item: VirtualItem;
    public itemForm: FormGroup;
    public method: 'post' | 'put'; // will be used later to make http requests
    public showAlert: boolean = false;

    constructor(
        private readonly _navigationService: FuseNavigationService,
        private readonly _router: Router,
        private readonly _route: ActivatedRoute,
        private readonly _virtualItemService: VirtualItemService,
        private readonly _dialog: MatDialog,
    ) {
        this.uploadUrl = `${environment.firestoragePath}/virtual-items`;

        this._route.params
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(params => {
                console.log('params: ', params)

                let id = params['id'];
                let item = params['item'];
                this._navigationService.projectId = id;

                this.prepareView(item);
            });

        this.itemForm = new FormGroup({
            itemId: new FormControl(null),
            name: new FormControl(null, Validators.required),
            description: new FormControl(null),
            image: new FormControl(null),
            category: new FormControl({ value: 'Game', disabled: true }),
            subCategory: new FormControl({ value: '', disabled: true }),
            price: new FormControl(null, Validators.required),
            isNFT: new FormControl(null),
            isAvailableForSale: new FormControl(null),
            currency: new FormControl('iCoin'),
            network: new FormControl(null),
            purchasableRGNAppId: new FormControl({ value: this._navigationService.projectId, disabled: true }),
        });
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    /**
     * Prepare the view, checking if there is an item id to load from the
     * database and edit that item. If there is no item id, it will prepare the
     * view to create a new item.
     *
     * @param itemId Item id to be loaded
     *
     * @returns void
     */
    private prepareView(itemId: string | null): void {
        if (!itemId) {
            this.method = 'post';
            this.btnLabel = 'Create';
            this.isLoaded = true;
        } else {
            this.isLoaded = false;

            this.method = 'put';
            this.btnLabel = 'Update';
            this.loadItem(itemId);
        }
    }

    /**
     * Load item details from the database based on item id.
     *
     * @param itemId itemId id to be loaded
     *
     * @returns void
     */
    private async loadItem(itemId: string): Promise<void> {
        this._virtualItemService.getItem(itemId)
            .then(response => {
                this.item = response;
                this.itemForm.reset(response);

                this.isLoaded = true;
            }).catch(error => {
                console.log('Error loadItem: ', error)
            });
    }

    /**
     * Populate, display and scroll to the message.
     *
     * @param type Type of message
     * @param message Message
     *
     * @returns void
     */
    private displayAlert(type: 'error' | 'success', message: string): void {
        this.alert.type = type;
        this.alert.message = message;

        this.showAlert = true;

        this.alertBox.nativeElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    /**
     * Hide and cleart alert message.
     *
     * @returns void
     */
    private hideAlert(): void {
        this.showAlert = false;
        this.alert.type = null;
        this.alert.message = null;
    }

    /**
     * Create a new item on Firebase database.
     *
     * @returns void
     */
    private createItem(): void {
        this._virtualItemService
            .create(this.itemForm.getRawValue())
            .then(response => {
                console.log('Response create: ', response);
                this.hideAlert();

                // If success, reload item and prepare view with new data
                if (response.itemId) {
                    this._router.navigate(['../', response.itemId], { relativeTo: this._route });
                }
            }).finally(() => {
                this.itemForm.enable();
            });
    }

    /**
     * Update one item on Firebase database.
     *
     * @returns void
     */
    private updateItem(data: any): void {
        console.log('updateItem: ', data)

        this._virtualItemService
            .update(data)
            .then(response => {
                console.log({ response })

                this.hideAlert();
            }).catch(error => {
                console.log({ error })
            }).finally(() => {
                this.itemForm.enable();
            });
    }

    private updateImage(data: any): void {
        console.log('update after image upload')
        console.log({ data })

        this._virtualItemService
            .update(data)
            .then(response => {
                console.log('Response update image: ', response);

                this.hideAlert();
            }).finally(() => {
            });
    }

    /**
     * Manage form submition based on item type.
     *
     * @return void
     */
    public onSubmit() {
        console.log(this.itemForm);

        this.itemForm.markAllAsTouched();

        // If form is invalid, abort and display error message
        if (this.itemForm.invalid) {
            return this.displayAlert('error', 'There are required fields missing');
        }

        this.itemForm.disable();

        // Create new item
        if (this.method === 'post') {
            this.createItem();
        }

        // Update existing item
        if (this.method === 'put') {
            this.uploader.onUpload();
        }
    }

    /**
     * Remove one item from Firebase database.
     *
     * @returns void
     */
    public removeItem(): void {
        // If no itemId, abort
        if (!this.item.itemId) return;

        const dialogRef = this._dialog.open(DialogRemoveComponent, {
            autoFocus: true,
            data: this.item,
            disableClose: true,
            maxWidth: '600px',
            panelClass: 'dialog_remove',
            width: '90%',
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog result: ${result}`);

            if (result) {
                this._router.navigate(['../'], { relativeTo: this._route });
            }
        });
    }

    public onUploadEvent(event: any) {
        const newValue = { ...this.itemForm.getRawValue() };

        if (event) {
            newValue.image = event.image;
            newValue.imageLink = event.imageLink;

            this.imageUrl = event;
            this.item.image = event;
            this.itemForm.patchValue({
                image: event
            });
        }

        console.log({ event, newValue})

        this.updateItem(newValue);
    }

    public onRemoveEvent(event: any) {
        console.log('onRemoveEvent item: ', event)

        this.imageUrl = null;
        delete this.item.image;
        this.itemForm.patchValue({
            image: ''
        });

        this.updateImage(this.itemForm.getRawValue());
    }
}
