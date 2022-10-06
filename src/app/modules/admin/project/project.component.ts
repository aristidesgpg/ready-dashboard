import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import * as moment from 'moment';
import {AuthService} from "../../../core/auth/auth.service";
import {FuseDrawerService} from "../../../../@fuse/components/drawer";
import {ActivatedRoute, Router} from "@angular/router";
import {AngularFirestore, AngularFirestoreDocument} from "@angular/fire/firestore";
import {FuseAlertService} from "../../../../@fuse/components/alert";
import {Observable} from "rxjs";
import firebase from "firebase";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {FuseNavigationService} from "../../../../@fuse/components/navigation";
import {environment} from "../../../../environments/environment";
import { FuseSplashScreenService } from '@fuse/services/splash-screen';

export interface Project { field: string; }

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProjectComponent implements OnInit {

  boards: any[] = [];
  //projects: Observable<any[]>;
  projects: any;
  project: Observable<any>;
  projectId:string;
  projectsSnapshot: Observable<any>;
  //private iconApp: firebase.app.App;


  anotherprojects: Array<firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>>;

  projectspecific: Observable<Project>;
  projectCreationForm: FormGroup;
  test = moment().startOf('day').subtract(1, 'day').toISOString()

  constructor(public authService: AuthService,
              private _fuseDrawerService: FuseDrawerService,
              private _fuseAlertService: FuseAlertService,
              private afs: AngularFirestore,
              private route: ActivatedRoute,
              private _formBuilder: FormBuilder,
              private router: Router,
              private _navigationService: FuseNavigationService,
              private _fuseSplashScreenService: FuseSplashScreenService) {
    route.params.subscribe(params => {
      let id = params['id'];
    })

    //this.iconApp = firebase.initializeApp(environment.firebaseTestWebAppProxyCX);

  }

  ngOnInit(): void {

    this.projectCreationForm = this._formBuilder.group({
      project_name: [
        '', [
          Validators.minLength(3),
          Validators.maxLength(25),
          Validators.pattern('^[A-Za-z][A-Za-z0-9- ]*$'),
          Validators.required]
      ]
    });

    this.projectCreationForm.get('project_name')
      .valueChanges
      .subscribe(([prev, next]: [any, any]) => {
        this.projectId = this.getProjectId()
      });


    /*
    const board = {
      'title': 'This is th etile',
      'description': 'this is the description'
    }

    this.boards.push(board);
    console.log(this.boards);
    */
    let path = 'roles.' + this.authService.userMasterData.uid;

    //this.projects = this.afs.collection('projects',ref => ref.where(path, 'in', ['owner'])).valueChanges()
    this.authService.readymasterAppFireStore.collection('projects')
      .withConverter(projectsConverter)
      .where(path, 'in', ['owner'])
      .onSnapshot((doc) => {
        this.projects  = doc.docs;
        this._fuseSplashScreenService.hide();
      });



    /*
    this.project = this.afs.collection('projects').doc('Kg5tBIMP9GFoI9fm6FGJ').valueChanges()
    this.projectspecific = this.afs.doc<Project>('projects/Kg5tBIMP9GFoI9fm6FGJ').valueChanges()


    console.log(this.project)
     */
    /*
    this.projectsSnapshot = this.afs.collection('projects', ).get().pipe(map((documentSnapshots) => {
      return documentSnapshots.docs.reduce((streamArray: StreamInterface[], documentSnapshot) => {
        streamArray.push(this.processStreamDocumentSnapshot(documentSnapshot)); // Does nothing rather to create an class of the JSON object passed back from the firestore
        return streamArray;
      }, []);
    }))*/
    /*
    const usersdocumentPath = "/projects/Kg5tBIMP9GFoI9fm6FGJ";
    try {
      this.authService.testFirestore?.collection(usersdocumentPath)
        .where('owner', '==', 'cxEsSol8eJdPqlZ1sbs19ccYT362s')
        .onSnapshot((doc) => {
          console.log('isthis working?' + doc.docs);
          this.anotherprojects = doc.docs;
        });
      } catch (error) {
        console.log('Message page error', error);
      }
     */
    /*
    this.authService.secondaryAppFireStore?.doc(documentPath)
      .withConverter(friendConverter).onSnapshot((doc) => {
      this.friends = doc.data();
    });*/


    //this.afs.collection("mydocuments").where("x", "in", [6, 42, 99, 105, 200]).get()
    //this.afs.list("mydocuments").where("x", "in", [6, 42, 99, 105, 200]).get()
    /*
    var docRef = this.afs.collection("projects").doc("SF");

    docRef.get().then((doc) => {
      if (doc.exists) {
        console.log("Document data:", doc.data());
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    }).catch((error) => {
      console.log("Error getting document:", error);
    });
    */

  }


  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Format the given ISO_8601 date as a relative date
   *
   * @param date
   */
  formatDateAsRelative(date: string): string
  {
    return moment(date, moment.ISO_8601).fromNow();
  }

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

  logout(){
    this.authService.logout();
  }

  toggleDrawerOpen(name: string): void
  {
    const drawer = this._fuseDrawerService.getComponent(name);

    if ( drawer )
    {
      drawer.toggle();
    }
  }

  generateUID(length) {
    let result           = '';
    const characters       = 'abcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() *
        charactersLength));
    }
    return result;
  }

  getProjectId(){
    const uuid = this.generateUID(3)

    const projectName = this.projectCreationForm.get('project_name').value;
    let safeProjectName = projectName.toLowerCase().replace(/\s+/g, '-')
    const lastChar = projectName.substr(-1);
    if(lastChar != '-'){
      safeProjectName=safeProjectName+'-';
    }
    let projectId = safeProjectName+uuid;
    return projectId;
  }
  addProject(){
    this.projectCreationForm.disable();
    const ownerId = this.authService.userMasterData.uid;
    const projectNameField = this.projectCreationForm.get('project_name');
    const projectName = projectNameField.value;
    //var addProject = this.authService.vfiSandboxApp.functions().httpsCallable('CreateGoogleProjectFromName');
    var addProject = this.authService.readymasterApp.functions().httpsCallable('CreateGoogleProjectFromName');
    addProject({ name: projectName, projectId: this.projectId})
      .then((result) => {
        let newProjectRef = this.authService.readymasterAppFireStore.collection("projects").doc()
        newProjectRef.set({
            id: newProjectRef.id,
            name: projectName,
            path: 'project-'+projectName,
            projectId: this.projectId,
            owner: ownerId,
            created: new Date(),
            roles: {
              [`${ownerId}`]: "owner",
            }
          }
        ).then((docRef) => {
          //console.log("Document written with ID: ", docRef.id);
          this._fuseAlertService.show('projectCreated');
          this.toggleDrawerOpen('rightDrawer');
          this.projectCreationForm.enable();
        }).catch((error) => {
          console.log("Document written with ID: ", error);
          this._fuseAlertService.show('alertBox3');
          console.error("Error adding document: ", error);
          this.projectCreationForm.enable();
        });
        console.log(result)
      });


  }
    /*

    this.afs.collection("projects").add({



      field: projectName.value,
      testAgain: 'project-234234',
      owner: ownerId,
      created: new Date(),
      roles: {
        [`${ownerId}`]: "owner",
      }
    }).then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
      this._fuseAlertService.show('projectCreated');
      this.toggleDrawerOpen('rightDrawer');
    }).catch((error) => {
      console.log("Document written with ID: ", error);
      this._fuseAlertService.show('alertBox3');
        console.error("Error adding document: ", error);
      });
  }

     */
  navigateToProject(id) {
    this._navigationService.projectId = id;
    this.router.navigate(['/project',id, 'overview']);
  }
}
const projectsConverter = {
  toFirestore(project: Project): firebase.firestore.DocumentData {
    return {name: project.name, path: project.path, members: project.members, created: project.created, projectId: project.projectId};
  },
  fromFirestore(
    snapshot: firebase.firestore.QueryDocumentSnapshot,
    options: firebase.firestore.SnapshotOptions
  ): Project {
    const data = snapshot.data(options)!;
    return new Project(data.name, data.path, data.members, data.created, data.projectId);
  }
};

export class Project {
  constructor(readonly name: string, readonly path: string, readonly members: [], readonly created: string, readonly projectId: string) {}

  toString(): string {
    return this.name + ', by ' + this.name;
  }
}
