import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { AuthService } from "app/core/auth/auth.service";

export interface Project { field: string; }

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProfileComponent implements OnInit {
  isFormShown = false;
  profileForm: FormGroup;
  userProfileData: any;
  selectedFile: any;
  selectedFileAsUrl: any;

  constructor (
    public authService: AuthService,
    private _formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.userProfileData = {
      displayName: this.authService.userData.displayName,
      photoURL: this.authService.userData.photoURL,
      email: this.authService.userData.email
    }

    this.profileForm = this._formBuilder.group({
      displayName: [this.userProfileData.displayName, ],
      photoURL: [this.userProfileData.photoURL]
    }) 

    // this.projectCreationForm = this._formBuilder.group({
    //   project_name: [
    //     '', [
    //       Validators.minLength(3),
    //       Validators.maxLength(25),
    //       Validators.pattern('^[A-Za-z][A-Za-z0-9- ]*$'),
    //       Validators.required]
    //   ]
    // });
  }


  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Format the given ISO_8601 date as a relative date
   *
   * @param date
   */
  // formatDateAsRelative(date: string): string
  // {
  //   return moment(date, moment.ISO_8601).fromNow();
  // }

  /**
   * Track by function for ngFor loops
   *
   * @param index
   * @param item
   */
  trackByFn(index: number, item: any): any
  {
    return item.id || index;
  }


  // toggleDrawerOpen(name: string): void
  // {
  //   const drawer = this._fuseDrawerService.getComponent(name);

  //   if ( drawer )
  //   {
  //     drawer.toggle();
  //   }
  // }

  editProfile(): void {
    this.isFormShown = !this.isFormShown;      
  }

  updateProfile(): void {
    this.isFormShown = !this.isFormShown;

    // this.profileForm.disable();

    this.userProfileData = {
      ...this.userProfileData,
      displayName: this.profileForm.value.displayName,
      photoURL: this.profileForm.value.photoURL
    }
  }

  onFileChanged(event): void {
    this.selectedFile = event.target.files[0];
    if (!(<string>(this.selectedFile?.type)?.includes('image'))) {
      return;
    }
    console.log(this.selectedFile, typeof this.selectedFile);
    this.profileForm.controls['photoURL'].setValue(this.selectedFile?.name)
    

    if (event.target.files && event.target.files[0]) {
      this.selectedFile = event.target.files[0];
      const reader = new FileReader();

      reader.readAsDataURL(this.selectedFile); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.selectedFileAsUrl = event.target.result;
      }
    }
  }

  uploadFile(file: any): void {
    const formData = new FormData();
    formData.append('file', file, file.name);

    // TODO add file uploading on server logic
  }

  cancelUpdating(): void {
    this.isFormShown = false;
    this.selectedFile = null;
    console.log(this.selectedFileAsUrl);
    this.selectedFileAsUrl = this.userProfileData.photoURL;
    console.log(this.selectedFileAsUrl);
  }
 
}
