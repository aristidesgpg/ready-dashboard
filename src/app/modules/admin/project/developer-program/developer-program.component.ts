import { STEPPER_GLOBAL_OPTIONS } from "@angular/cdk/stepper";
import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import { AbstractControl, FormArray, FormControl, FormGroup, ValidationErrors, Validators } from "@angular/forms";
import { fuseAnimations } from "../../../../../@fuse/animations";
import { FuseAlertType } from "../../../../../@fuse/components/alert";
import { AuthService } from "../../../../core/auth/auth.service";
import { devProgram } from "./developer-program.config";
import { developerProgram, formItem } from "./developer-program.type";

@Component({
    templateUrl: './developer-program.component.html',
    styleUrls: ['./developer-program.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
    providers: [
        {
            provide: STEPPER_GLOBAL_OPTIONS,
            useValue: { displayDefaultIndicatorType: false },
        },
    ],
})

export class DeveloperProgramComponent implements OnInit {
    @ViewChild('alertBox') alertBox: ElementRef;
    @ViewChild('genderGroup') genderGroup: ElementRef;
    @ViewChild('genderInput') genderInput: ElementRef;

    public readonly config: developerProgram;

    public formBasic: FormGroup;
    public formDemo: FormGroup;
    public formGame: FormGroup;
    public isApplicationSubmited: boolean = false;
    public showAlert: boolean = false;
    public alert: {
        type: FuseAlertType;
        message: string;
    } = {
        type: 'success',
        message: ''
    };

    /**
     * Constructor
     */
    constructor(
        private _authService: AuthService,
    ) {
        this.config = devProgram;
    }

    ngOnInit(): void {
        // TODO
        // Use same logic, but for beta program
        this.isApplicationSubmited = this._authService.realMasterData?.applicationSubmited;
        if (!this.isApplicationSubmited) {
        }

        this.formInit();
    }

    /**
     * Initialize the forms, creating the FormArray necessary and initial data,
     * if needed.
     *
     * @returns void
     */
    private formInit(): void {
        this.formBasic = new FormGroup({
            first_name: new FormControl(null, Validators.required),
            last_name: new FormControl(null, Validators.required),
            discord_username: new FormControl(null),
        });

        this.formDemo = new FormGroup({
            birth_date: new FormControl(null),
            gender: new FormControl(null, Validators.required),
            country: new FormControl(null, Validators.required),
            house_income: new FormControl(null),
            children: new FormControl(null, Validators.required),
            employment: new FormControl(null),
            occupation: new FormControl(null),
            language: new FormArray([], { validators: this.atLeastOne, updateOn: "blur" }),
        });

        this.formGame = new FormGroup({
            game_genre: new FormArray([], { validators: this.atLeastOne, updateOn: "blur" }),
            devices: new FormArray([], { validators: this.atLeastOne, updateOn: "blur" }),
            software_version: new FormControl(null, Validators.required),
            game_expertise: new FormControl(null, Validators.required),
            web_browser: new FormArray([]),
            social_network: new FormArray([]),
            game_favorite: new FormControl(null, Validators.required),
            game_love: new FormControl(null),
        });

        this.populateFormArray();
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

        this.formBasic[control]();
        this.formDemo[control]();
        this.formGame[control]();
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
     * Custom validation function to require at least one option to be selected
     *
     * @param control
     *
     * @returns ValidationErrors
     */
    private atLeastOne(control: AbstractControl): ValidationErrors {
        const valid = (control as FormArray).controls.some(c => {
            const name = Object.keys(c.value)[0];
            const val = Boolean(c.value[name]);

            return val === true
        });

        return valid ? null : { required: true };
    }

    /**
     * Populate each FormArray with it's value.
     *
     * @returns void
     */
    private populateFormArray(): void {
        // Language
        const languageArray = this.formDemo.get('language') as FormArray;
        this.config.language.forEach((item: formItem) => {
            languageArray.push(this.createNewLine(item));
        });

        // Game genre
        const gameGenreArray = this.formGame.get('game_genre') as FormArray;
        this.config.game_genre.forEach((item: formItem) => {
            gameGenreArray.push(this.createNewLine(item));
        });

        // Social Network
        const socialArray = this.formGame.get('social_network') as FormArray;
        this.config.social_network.forEach((item: formItem) => {
            socialArray.push(this.createNewLine(item));
        });

        // Web Browser
        const browserArray = this.formGame.get('web_browser') as FormArray;
        this.config.web_browser.forEach((item: formItem) => {
            browserArray.push(this.createNewLine(item));
        });

        // Devices
        const devicesArray = this.formGame.get('devices') as FormArray;
        this.config.devices.forEach((item: formItem) => {
            devicesArray.push(this.createNewLine(item));
        });
    }

    /**
     * Create the FormGroup that goes into the FormArray, based on the config
     * options.
     *
     * @param item Item to be converted to FormControl
     *
     * @returns FormGroup
     */
    private createNewLine(item: formItem): FormGroup {
        return new FormGroup({
            [item.name]: new FormControl(),
        });
    }

    /**
     * Make sure that only radio or input has value. When one is used, the
     * other is cleared.
     *
     * @param type From where the event came from
     *
     * @returns void
     */
    public setGenderValue(type: 'radio'|'input'): void {
        if (type === 'radio') {
            this.genderInput.nativeElement.value = null;
        }

        if (type === 'input') {
            const children = this.genderGroup.nativeElement.children;

            Array.from(children).forEach((child: HTMLElement) => {
                child.classList.remove('mat-radio-checked');
            });
        }
    }

    /**
     * Post the form submission.
     *
     * @returns void
     */
    public onSubmit(): void {
        // Do nothing if the form is invalid
        if (this.formBasic.invalid || this.formDemo.invalid || this.formGame.invalid) {
            const msg = 'Please review your form submition, there are required fields';
            this.displayAlert('error', msg);
            return;
        }

        this.formControl(false);
        this.showAlert = false;

        // Used when there is a function() to handle this case in firebase
        // let submitDeveloperApplication = this._authService.readymasterApp.functions().httpsCallable('DeveloperBetaApplication');

        let resource = {
            ...this.formBasic.getRawValue(),
            ...this.formDemo.getRawValue(),
            ...this.formGame.getRawValue(),
        };

        /**
         * Data will be used when we create a function() in firebase that
         * controls and validate that. For now, it's saving into firebase
         * right away.
         */
        // let data = {
        //     token: this._authService.userMasterToken,
        //     formValues: resource
        // };

        this._authService.readymasterApp
            .firestore()
            .collection('developer-beta-application')
            .add(resource)
            .then(response => {
                console.log('Response: ', response);

                this.formBasic.reset();
                this.formDemo.reset();
                this.formGame.reset();

                this.displayAlert('success', 'Thank you for submitting your application');
            }).catch(error => {
                console.log('Error: ', error);
            }).finally(() => {
                console.log('finally...')

                this.formControl(true);
            });
    }
}
