import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
//import {AuthServiceFireBase} from "../../../authentication.service";
import {AuthService} from "../../../core/auth/auth.service";

@Component({
    selector     : 'auth-sign-in',
    templateUrl  : './sign-in.component.html',
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class AuthSignInComponent implements OnInit
{
    @ViewChild('signInNgForm') signInNgForm: NgForm;

    alert: { type: FuseAlertType; message: string } = {
        type   : 'success',
        message: ''
    };
    signInForm: FormGroup;
    showAlert: boolean = false;
    userMasterData?: any

    /**
     * Constructor
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
        public _authService: AuthService,
        private _formBuilder: FormBuilder,
        private _router: Router,
        //public authService: AuthServiceFireBase,
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        // Create the form
        this.signInForm = this._formBuilder.group({
            email     : ['', [Validators.required, Validators.email]],
            password  : ['', Validators.required],
            rememberMe: ['']
        });

    }

    loginGoogle() {
        this.signInForm.disable();

        this._authService
            .googleLogin()
            .then()
            .finally(() => {
                this.signInForm.enable();
            });
    }

    facebookLogin() {
        this.signInForm.disable();

        this._authService
            .facebookLogin()
            .then()
            .finally(() => {
                this.signInForm.enable();
            });
    }

    appleLogin() {
        this.signInForm.disable();

        this._authService
            .appleLogin()
            .then()
            .finally(() => {
                this.signInForm.enable();
            });
    }

    logout(){
        this._authService.logout();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Sign in
     */
    signIn(): void
    {
        // Return if the form is invalid
        if ( this.signInForm.invalid )
        {
            return;
        }

        // Disable the form
        this.signInForm.disable();

        // Hide the alert
        this.showAlert = false;

        const { email, password } = this.signInForm.value;

        // Sign in
        this._authService.login(email, password)
            .then(response => {

                // Set the redirect url.
                // The '/signed-in-redirect' is a dummy url to catch the request and redirect the user
                // to the correct page after a successful sign in. This way, that url can be set via
                // routing file and we don't have to touch here.
                const redirectURL = this._activatedRoute.snapshot.queryParamMap.get('redirectURL') || '/signed-in-redirect';

                // Navigate to the redirect url
                if (this._authService.realMasterData?.isApprovedDeveloper) {
                    this._router.navigateByUrl(redirectURL);
                } else {
                    this._router.navigateByUrl('welcome/sign-up-flow');
                }
            })
            .catch(response => {

                // Re-enable the form
                this.signInForm.enable();

                // Reset the form
                this.signInNgForm.resetForm();

                // Set the alert
                this.alert = {
                    type   : 'error',
                    message: 'Wrong email or password'
                };

                // Show the alert
                this.showAlert = true;
            })
    }
}
