import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import { AuthService } from 'app/core/auth/auth.service';

@Component({
    selector: 'developer-sign-up',
    templateUrl: './developer-sign-up.component.html',
    styleUrls: ['./developer-sign-up.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
    providers: [
        {
            provide: STEPPER_GLOBAL_OPTIONS,
            useValue: { displayDefaultIndicatorType: false },
        },
    ],
})

export class DeveloperSignUpComponent implements OnInit {
    @ViewChild('alertBox') alertBox: ElementRef;

    public firstFormGroup: FormGroup;
    public secondFormGroup: FormGroup;
    public isApplicationSubmited: boolean = false;
    public showAlert: boolean = false;
    public alert: {
        type: FuseAlertType;
        message: string;
    } = {
        type: 'success',
        message: '',
    };

    constructor(
        private _authService: AuthService,
    ) { }

    ngOnInit(): void {
        this.isApplicationSubmited = this._authService.realMasterData?.applicationSubmited;

        if (!this.isApplicationSubmited) {
            this.formInit();
        }
    }

    /**
     * Form yet not submitted, initialize forms.
     *
     * @returns void
     */
    private formInit(): void {
        this.firstFormGroup = new FormGroup({
            firstName: new FormControl(null, Validators.required),
            lastName: new FormControl(null, Validators.required),
            isCompanyMember: new FormControl(false, Validators.required),
            companyName: new FormControl(null),
            description: new FormControl(null),
            referalCode: new FormControl(null),
        });

        this.secondFormGroup = new FormGroup({
            linkIos: new FormControl(null),
            linkGoogle: new FormControl(null),
            webpage: new FormControl(null),
            kpis: new FormControl(null),
            arppu: new FormControl(null),
            arpdau: new FormControl(null),
            dau: new FormControl(null),
            mau: new FormControl(null),
            retention: new FormControl(null),
            agreements: new FormControl(null, Validators.requiredTrue),
        });
    }

    /**
     * Since we controle multiple forms for each step, here we control how to
     * handle their state.
     *
     * @param enable Enable or Disable the forms
     *
     * @returns void
     */
    private formControl(enable: boolean): void {
        const control = enable ? 'enable' : 'disable';

        this.firstFormGroup[control]();
        this.secondFormGroup[control]();
    }

    /**
     * Populate, display and scroll to the message.
     *
     * @param type Type of message
     * @param message Message
     *
     * @returns void
     */
    private displayAlert(type: 'error'|'success', message: string): void {
        this.alert.type = type;
        this.alert.message = message;

        this.showAlert = true;

        this.alertBox.nativeElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    /**
     * Receive event when clicking on the checkbox. Company name is required if
     * user select this option.
     *
     * @param event
     */
    public onChangeCompanyMember(event: MatCheckboxChange): void {
        const value = event.checked;

        if (value) {
            this.firstFormGroup.get('companyName')?.setValidators([ Validators.required ]);
            this.firstFormGroup.get('companyName')?.setErrors({ required: true });
        } else {
            this.firstFormGroup.get('companyName')?.clearValidators();
            this.firstFormGroup.get('companyName')?.setErrors(null);
        }
    }

    /**
     * Sign up the form submition.
     *
     * @returns void
     */
    public signUp(): void {
        // Do nothing if the form is invalid
        if (this.firstFormGroup.invalid || this.secondFormGroup.invalid) {
            const msg = 'Please review your form submition, there are required fields';
            this.displayAlert('error', msg);

            return;
        }

        this.formControl(false);
        this.showAlert = false;

        // TODO Sign up
        let submitDeveloperApplication = this._authService.readymasterApp.functions().httpsCallable('DeveloperApplication');
        let resource = {
            ...this.firstFormGroup.getRawValue(),
            ...this.secondFormGroup.getRawValue(),
        };

        let data = {
            token: this._authService.userMasterToken,
            formValues: resource
        }

        submitDeveloperApplication(data)
            .then((result) => {
                const email = result.data.email;
                const user_id = result.data.user_id;
                const msg = 'Thank you for submitting your application';

                this.displayAlert('success', msg);
                this.formControl(true);

                /*
                this.authService.readymasterAppFireStore.collection("projects").doc(this.project.id).set({
                    "firebase_apps": FieldValue.arrayUnion({
                        packageName: android_app.packageName,
                        appId: android_app.appId,
                        displayName: android_app.displayName,
                        shaFingerprint: sha_fingerprint,
                        type:"android"
                    },{
                        appId: ios_app.appId,
                        bundleId: ios_app.bundleId,
                        displayName:ios_app.displayName,
                        type:"ios"
                    })
                },{ merge: true });

                 */

                this.isApplicationSubmited = true;
            });
    }
}
