import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import firebase from "firebase";
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators
} from "@angular/forms";
import {FuseDrawerService} from "../../../../../@fuse/components/drawer";
import {FuseHighlightService} from '@fuse/components/highlight';
import {AuthService} from "../../../../core/auth/auth.service";
import {Project} from "../team/team.component";
import FileSaver from "file-saver";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import FieldValue = firebase.firestore.FieldValue;
import {MatDrawer} from "@angular/material/sidenav";

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class OverviewComponent implements OnInit {
  @ViewChild('drawer') drawer: MatDrawer;

  drawerMode: 'over' | 'side' = 'side';
  id=undefined;
  verticalStepperForm: FormGroup;
  verticalStepperFormShort: FormGroup;
  code = '<div> Some code to highlight </div>'
  angularPattern = '^[a-z][a-z0-9_]*(\\.[a-z0-9_]+)+[0-9a-z_]$'
  sha_1_Pattern = '^[0-9A-Fa-f]{2}(:[0-9A-Fa-f]{2}){19}'
  packagesSubmitted: boolean = false;
  project: Project;
  isGood = false;
  panels: any[] = [];
  selectedPanel: string = 'android';
  drawerOpened: boolean = true;
  web3obj: {
    account: any;
    balance: any;
    block: any;
    blockNumber: any;
    code: any;
    gas_price: any;
  } = {
    account: null,
    balance: null,
    block: null,
    blockNumber: null,
    code: null,
    gas_price: null,
  }

  constructor(
    public authService: AuthService,
    private _route: ActivatedRoute,
    private _formBuilder: FormBuilder,
    private _fuseDrawerService: FuseDrawerService,
    private _fuseHighlightService: FuseHighlightService,
    private _http: HttpClient,
  ) {
    this._route.params.subscribe(params => {
      this.id = params['id'];
    });

    const highlightedCode = this._fuseHighlightService.highlight(this.code, 'typescript');
  }

  ngOnInit(): void {
    this.panels = [
      {
        id         : 'account',
        icon       : 'heroicons_outline:user-circle',
        title      : 'Account',
        description: 'Manage your public profile and private information'
      },
      {
        id         : 'security',
        icon       : 'heroicons_outline:lock-closed',
        title      : 'Security',
        description: 'Manage your password and 2-step verification preferences'
      },
      {
        id         : 'plan-billing',
        icon       : 'heroicons_outline:credit-card',
        title      : 'Plan & Billing',
        description: 'Manage your subscription plan, payment method and billing information'
      }
    ];


    this.getProjectId(this.id);

    // Vertical stepper form
    this.verticalStepperForm = this._formBuilder.group({
      step_android_package: [
        '',[
          Validators.minLength(4),
          Validators.maxLength(50),
          //Validators.pattern(this.angularPattern),
          Validators.pattern(this.angularPattern),
          Validators.required
        ]
      ],
      step_sha_1: [
        '',[
          Validators.pattern(this.sha_1_Pattern),
          Validators.required
        ]
      ],
      step_ios_bundle: [
        '',[
          Validators.minLength(4),
          Validators.maxLength(155),
          Validators.pattern(this.angularPattern),
          Validators.required,
          this.packagesAreSubmitted()]
      ],
      step2: this._formBuilder.group({
      }),
      step3: this._formBuilder.group({
        byEmail          : this._formBuilder.group({
          companyNews     : [true],
          featuredProducts: [false],
          messages        : [true]
        }),
        pushNotifications: ['everything', Validators.required]
      })
    });

    this.verticalStepperFormShort = this._formBuilder.group({
      step2: this._formBuilder.group({
      }),
      step3: this._formBuilder.group({
        byEmail          : this._formBuilder.group({
          companyNews     : [true],
          featuredProducts: [false],
          messages        : [true]
        }),
        pushNotifications: ['everything', Validators.required]
      })
    });


  }

  getProjectId(id){
    this.authService.readymasterAppFireStore.collection('projects').doc(id).onSnapshot((doc) => {
      this.project = doc.data() as Project
      if(this.project.firebase_apps){
        this.selectedPanel = this.project.firebase_apps[0].appId;
      }
    })
  }

  submit_information() {
    let messageText = {
      "message": "this is  a test"
    };
    /*
    var addMessage = this.authService.vfiSandboxApp.functions().httpsCallable('CheckAuthStatus');
    addMessage({ text: messageText, token: ""})
      .then((result) => {
        // Read result of the Cloud Function.
        //var sanitizedMessage = result.data.text;
        console.log(result)
      });

     */
  }

  toggleDrawerOpen(name: string): void {
    const drawer = this._fuseDrawerService.getComponent(name);

    if ( drawer )
    {
      drawer.toggle();
    }
  }

  downloadTest(applicationType){
    let package_name = "testpackage_name"
    let bundle_id = "testbundle_idd"
    let fileName = 'google-services.json';
    let appType = 'androidApps';
    if (applicationType == 'android'){
      fileName = 'google-services.json';
      appType = 'androidApps';
    }else{
      fileName = 'GoogleService-Info.plist';
      appType = 'iosApps';
    }



    const headers = new HttpHeaders();
    headers.append('Content-Type','application/json');
    const url = 'https://us-central1-readysandbox.cloudfunctions.net/DownloadConfigFiles'

    let data = {}

    for (const app of this.project.firebase_apps ) {
      if (app.type == applicationType){
        data = {
          "project_name": this.project.projectId,
          "app_id": app.appId,
          "app_type": appType,
        }
      }
    }

    this._http.post(url, { headers: headers, data:data, responseType: 'blob' }).subscribe(
      res => {
        console.log(res);
        let fileContent =JSON.stringify(res, null, 2);
        var blob = new Blob([fileContent], {type: "application/json"});
        FileSaver.saveAs(blob, fileName);
        },
      ero => { console.log(ero)
        var blob = new Blob([ero.error.text], {type: "text/xml"});
        FileSaver.saveAs(blob, fileName);
      }
    )

    /*
    var addAppsConfigs = this.authService.readymasterApp.functions().httpsCallable('DownloadConfigFiles');
    addAppsConfigs()
      .then((result) => {
        console.log(result.data)
        //var data = new Blob([result.data], { //your file type here });
        FileSaver.saveAs(result.data, "test.json");
      });

     */

  }

  /**
   * Navigate to the panel
   *
   * @param panel
   */
  goToPanel(panel: string): void {
    this.selectedPanel = panel;

    // Close the drawer on 'over' mode
    if ( this.drawerMode === 'over' )
    {
      this.drawer.close();
    }
  }

  appIsSetForDownload(){
    if (this.project && this.project.firebase_apps){
      return true
    }
    return false;
  }


  linkPackageAndBundle($event: MouseEvent, stepper) {
    //this.verticalStepperForm.get('step_android_package').disable()
    //this.verticalStepperForm.get('step_ios_bundle').disable()
    this.packagesSubmitted = true;
    const projectName = this.project.projectId;
    const package_name = this.verticalStepperForm.get('step_android_package').value;
    const bundle_id = this.verticalStepperForm.get('step_ios_bundle').value;
    const sha_fingerprint = this.verticalStepperForm.get('step_sha_1').value;
    //var addAppsConfigs = this.authService.vfiSandboxApp.functions().httpsCallable('AddAppsConfigAndSignIn');
    var addAppsConfigs = this.authService.readymasterApp.functions().httpsCallable('AddAppsConfigAndSignIn');

    let data = {
      'bundle_id': bundle_id,
      'package_name': package_name,
      'project_name': projectName,
      'sha-1': sha_fingerprint
    }





    addAppsConfigs(data)
      .then((result) => {
        const ios_app = JSON.parse(result.data.ios_app);
        const android_app = JSON.parse(result.data.android_app);
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

        this.isGood = !this.isGood;
        this.verticalStepperForm.controls['step_ios_bundle'].updateValueAndValidity();
        console.log(result)
        stepper.next();
      });


  }

  testForm() {
    this.isGood = !this.isGood;
    this.verticalStepperForm.controls['step_ios_bundle'].updateValueAndValidity();
  }

  packagesAreSubmitted(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (this.packagesSubmitted){
        return null;
      }
      return { 'packagesAreSubmitted': true };

    }

  }

  /**
   * Get the details of the panel
   *
   * @param id
   */
  getPanelInfo(id: string): any {
    return this.panels.find(panel => panel.id === id);
  }

  /**
   * Track by function for ngFor loops
   *
   * @param index
   * @param item
   */
  trackByFn(index: number, item: any): any {
    return item.id || index;
  }
}

