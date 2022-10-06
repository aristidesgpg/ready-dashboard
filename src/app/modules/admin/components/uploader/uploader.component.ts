import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { UploadFile, UploadInput, UploadOutput } from 'ngx-uploader';
import { finalize, Observable, Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'ready-uploader[url]',
    templateUrl: 'uploader.component.html'
})

export class UploaderComponent implements OnInit {
    @Input() url: string;
    @Input() file: string;
    @Input() fileName: string;
    @Input() filePreview: any;

    @Output() onUploadEvent = new EventEmitter<any>();
    @Output() onRemoveEvent = new EventEmitter<any>();

    private readonly _unsubscribeAll: Subject<any> = new Subject<any>();

    public readonly uId: string;

    public uploader: EventEmitter<UploadInput>;
    public uploaderFiles: UploadFile[] = [];
    public uploaderOnHover: boolean = false;
    public uploaderProgress: Observable<number>;

    constructor(
        private readonly _storage: AngularFireStorage,
    ) {
        this.uId = this.uniqueId(5);
        this.uploader = new EventEmitter<UploadInput>();
    }

    ngOnInit(): void {
        console.log('File on uploader: ', this.file);
        console.log('FileName on uploader: ', this.fileName);
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    /**
     * Generate unique id for the component. Avoid click issues when more than
     * one instance is used on the same page.
     *
     * @param length How many chars to have
     *
     * @returns string
     */
    private uniqueId(length: number): string {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }

        return result;
    }

    private previewImage(): void {
        const file = this.uploaderFiles[0].nativeFile;

        const reader = new FileReader();
        reader.onload = (e) => {
            console.log('response preview', e)
            console.log('response preview', reader.result)
            this.filePreview = reader.result;
        };

        reader.readAsDataURL(file);
    }

    private removePreviewImage(): void {
        this.filePreview = null;
        this.uploaderFiles = [];
    }

    private removeImage() {
        const ref = this._storage.refFromURL(`${this.url}/${this.fileName}`);
        const task = ref.delete();

        task
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(response => {
                console.log('removeImage response: ', response);
                this.onRemoveEvent.next(response);
            });
    }

    public onUploadOutput(output: UploadOutput) {
        console.log('output: ', output)
        switch (output.type) {
            case 'addedToQueue': {
                if (output.file) {
                    console.log({ output })
                    this.uploaderFiles.push(output?.file);
                    this.previewImage()
                    return;
                }

                return;
            }

            case 'dragOver': {
                return this.uploaderOnHover = true;
            }

            case 'dragOut': {
                return this.uploaderOnHover = false;
            }

            case 'drop': {
                return this.uploaderOnHover = false;
            }
        }
    }

    public onRemove() {
        if (this.filePreview) {
            this.removePreviewImage();
        }

        if (this.fileName) {
            this.removeImage();
        }
    }

    public onUpload() {
        console.log('upload start')
        if (!this.uploaderFiles.length) {
            this.onUploadEvent.next(null);
            return;
        }

        const randomId = Math.random().toString(36).substring(2);
        const ref = this._storage.refFromURL(`${this.url}/${randomId}`);
        const task = ref.put(this.uploaderFiles[0].nativeFile);

        this.uploaderProgress = task.percentageChanges();

        let tmp;

        task
            .snapshotChanges()
            .pipe(
                takeUntil(this._unsubscribeAll),
                finalize(() => {
                    const url = ref.getDownloadURL();
                    console.log('URL 1: ', url);

                    url.subscribe(link => {
                        console.log({ link })
                        const obj = {
                            image: tmp.metadata.name,
                            imageLink: link,
                        }

                        this.onUploadEvent.next(obj);
                    })

                })
            ).subscribe(result => {
                console.log('URL 2: ', result);
                tmp = result;
            });
    }
}
