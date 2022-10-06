import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  NgZone,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AngularFirestore} from "@angular/fire/firestore";
import {map, Observable} from "rxjs";
import {FuseNavigationService} from "../../../../../@fuse/components/navigation";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {AuthService} from "../../../../core/auth/auth.service";
import {AngularFireFunctions} from "@angular/fire/functions";
import {FirebaseApp} from "@angular/fire";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss'],
  encapsulation  : ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})



export class TeamComponent implements OnInit {

  id: string = undefined;

  members: any[];
  roles: any[];

  cost: number;
  name: string;

  //project: Observable<any>;
  project: Project;
  teamMembers= [];

  role: string;
  email: string;
  dialogname: string;

  constructor(
    private route: ActivatedRoute,
    //private angularFirestore: AngularFirestore,
    //private firebaseApp: FirebaseApp,
    private _navigationService: FuseNavigationService,
    public dialog: MatDialog,
    public zone: NgZone,
    private ref: ChangeDetectorRef,
    public authService: AuthService,
  ) {
    route.params.subscribe(params => {
      this.id = params['id'];
      _navigationService.projectId = this.id;
    });

  }

  testAuth(){

    const ownerId = this.authService.userData.uid;
    //const projectNameField = this.projectCreationForm.get('project_name');
    //const projectName = projectNameField.value;
    /*
    var testCallable = this.firebaseApp.functions().httpsCallable('HelloWorld');

    testCallable({ name: "test", token: this.authService.token}, )
      .then((result) => {
        console.log(result);
      });

     */

    var addProject = this.authService.readymasterApp.functions().httpsCallable('ToDeleteVerifyAuthenticationv2');
    addProject({ name: "test", token: this.authService.userMasterToken}, )
      .then((result) => {
        console.log(result);
      });




  }

  openAddTeamMemberDialog() {
    const dialogRef = this.dialog.open(AddTeamMemberDialog, {
      width: '80%',
      data: {email: this.email, role: this.role},
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        let inviteTeamMember = this.authService.readymasterApp.functions().httpsCallable('InviteTeamMember');
        let data = {
          token: this.authService.userMasterToken,
          project_id: this.project.id,
          email: result.email
        }
        inviteTeamMember(data, )
          .then((result) => {
            console.log(result);
          });
      }
    });
  }

  getRoleByMemberId(memberId){
    let role = this.project.roles[memberId];
    return role
  }

  getMembers(){
    this.teamMembers= [];
    this.authService.readymasterAppFireStore.collection('projects').doc(this.id).get().then((data) => {
      const project:Project = data.data() as Project
      Object.keys(project.roles).forEach((userId, role) => {
        this.authService.readymasterAppFireStore.collection('users').doc(userId).get().then((team) => {
          const teamMember:TeamMember = team.data() as TeamMember
          teamMember.role = this.getRoleByMemberId(teamMember.userId)
          this.teamMembers.push(teamMember)
          this.ref.markForCheck();
        });
      });
    });
  }

  ngOnInit(): void {
    {

      this.authService.readymasterAppFireStore.collection('projects').doc(this.id).onSnapshot((doc) => {
        let data = doc.data()
        this.project = data as Project
        this.getMembers();

        console.log('doc updated...', data);
      })


      // Setup the team members
      this.members = [
        {
          avatar: 'assets/images/avatars/male-01.jpg',
          name  : 'Dejesus Michael',
          email : 'dejesusmichael@mail.org',
          role  : 'admin'
        },
        {
          avatar: 'assets/images/avatars/male-03.jpg',
          name  : 'Mclaughlin Steele',
          email : 'mclaughlinsteele@mail.me',
          role  : 'admin'
        },
        {
          avatar: 'assets/images/avatars/female-02.jpg',
          name  : 'Laverne Dodson',
          email : 'lavernedodson@mail.ca',
          role  : 'write'
        },
        {
          avatar: 'assets/images/avatars/female-03.jpg',
          name  : 'Trudy Berg',
          email : 'trudyberg@mail.us',
          role  : 'read'
        },
        {
          avatar: 'assets/images/avatars/male-07.jpg',
          name  : 'Lamb Underwood',
          email : 'lambunderwood@mail.me',
          role  : 'read'
        },
        {
          avatar: 'assets/images/avatars/male-08.jpg',
          name  : 'Mcleod Wagner',
          email : 'mcleodwagner@mail.biz',
          role  : 'read'
        },
        {
          avatar: 'assets/images/avatars/female-07.jpg',
          name  : 'Shannon Kennedy',
          email : 'shannonkennedy@mail.ca',
          role  : 'read'
        },
        {
          avatar: 'assets/images/avatars/female-07.jpg',
          name  : 'Shannon Kennedy',
          email : 'shannonkennedy@mail.ca',
          role  : 'read'
        },
        {
          avatar: 'assets/images/avatars/female-07.jpg',
          name  : 'Shannon Kennedy',
          email : 'shannonkennedy@mail.ca',
          role  : 'read'
        },
        {
          avatar: 'assets/images/avatars/female-07.jpg',
          name  : 'Shannon Kennedy',
          email : 'shannonkennedy@mail.ca',
          role  : 'read'
        },
        {
          avatar: 'assets/images/avatars/female-07.jpg',
          name  : 'Shannon Kennedy',
          email : 'shannonkennedy@mail.ca',
          role  : 'read'
        },
        {
          avatar: 'assets/images/avatars/female-07.jpg',
          name  : 'Shannon Kennedy',
          email : 'shannonkennedy@mail.ca',
          role  : 'read'
        },
        {
          avatar: 'assets/images/avatars/female-07.jpg',
          name  : 'Shannon Kennedy',
          email : 'shannonkennedy@mail.ca',
          role  : 'read'
        },
        {
          avatar: 'assets/images/avatars/female-07.jpg',
          name  : 'Shannon Kennedy',
          email : 'shannonkennedy@mail.ca',
          role  : 'read'
        }
      ];

      // Setup the roles
      this.roles = [
        {
          label      : 'Read',
          value      : 'read',
          description: 'Can read and clone this repository. Can also open and comment on issues and pull requests.'
        },
        {
          label      : 'Write',
          value      : 'write',
          description: 'Can read, clone, and push to this repository. Can also manage issues and pull requests.'
        },
        {
          label      : 'Owner',
          value      : 'owner',
          description: 'Can read, clone, and push to this repository. Can also manage issues, pull requests, and repository settings, including adding collaborators.'
        }
      ];
    }
  }

}

export interface Project {
  id: string;
  name: string;
  owner: string;
  path: string;
  projectId: string;
  roles: Map<any, any>;
  firebase_apps: any[];
}


export interface TeamMember {
  uid: string;
  userId: string;
  displayName: string;
  email: string;
  role: string;
}


export interface DialogData {
  email: string;
  role: string;
  dialogname: string;
}

@Component({
  selector: 'dialog-add-team-member',
  templateUrl: 'dialog/dialog-add-team-member.html',
})
export class AddTeamMemberDialog {

  // Setup the roles
  roles = [
    {
      label      : 'Read',
      value      : 'read',
      description: 'Can read and clone this repository. Can also open and comment on issues and pull requests.'
    },
    {
      label      : 'Write',
      value      : 'write',
      description: 'Can read, clone, and push to this repository. Can also manage issues and pull requests.'
    },
    {
      label      : 'Owner',
      value      : 'owner',
      description: 'Can read, clone, and push to this repository. Can also manage issues, pull requests, and repository settings, including adding collaborators.'
    }
  ];

  teamMemberForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddTeamMemberDialog>,
    private _formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  ngOnInit(): void {


    // Vertical stepper form
    this.teamMemberForm = this._formBuilder.group({
      email: [
        '', [
          Validators.email,
          Validators.required
        ]
      ],
      role: [
        '', [
          Validators.required
        ]
      ],

    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  okClick(data) {
    this.dialogRef.close(data);
  }
}

