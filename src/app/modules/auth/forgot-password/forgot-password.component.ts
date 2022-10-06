import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import { AuthService } from 'app/core/auth/auth.service';

@Component({
  selector: 'auth-forgot-password',
  templateUrl: './forgot-password.component.html',
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class AuthForgotPasswordComponent implements OnInit
{
  @ViewChild('forgotPasswordNgForm') forgotPasswordNgForm: NgForm;

  alert: { type: FuseAlertType; message: string } = {
      type   : 'success',
      message: ''
  };
  forgotPasswordForm: FormGroup;
  showAlert: boolean = false;

  /**
   * Constructor
   */
  constructor(
    private _authService: AuthService,
    private _formBuilder: FormBuilder
  ) { }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    // Create the form
    this.forgotPasswordForm = this._formBuilder.group({
        email: ['', [Validators.required, Validators.email]]
    });
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Send the reset link
   */
  sendResetLink(): void {
    // Return if the form is invalid
    if ( this.forgotPasswordForm.invalid ) {
      return;
    }

    // Disable the form
    this.forgotPasswordForm.disable();

    // Hide the alert
    this.showAlert = false;

    const { email } = this.forgotPasswordForm.value;

    this._authService.forgotPasswordViaEmail(email)
      .then(() => {
        // Re-enable the form
        this.forgotPasswordForm.enable();

        // Reset the form
        this.forgotPasswordNgForm.resetForm();

        this.alert = {
          type   : 'success',
          message: 'Password reset sent! You\'ll receive an email if you are registered on our system.'
        };

        // Show the alert
        this.showAlert = true;
      })
      .catch(() => {
        this.alert = {
          type   : 'error',
          message: 'Email does not found! Are you sure you are already a member?'
        };

        this.showAlert = true;
      })
  }
}
