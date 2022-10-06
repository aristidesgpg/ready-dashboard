import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AuthService} from "../../../../core/auth/auth.service";
import firebase from "firebase";
import {environment} from "../../../../../environments/environment";
import {AngularFireFunctions} from "@angular/fire/functions";
import {AngularFirestore} from "@angular/fire/firestore";
import {Subject} from "rxjs";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DetailComponent implements OnInit {
  id=-1;
  //private iconApp: firebase.app.App;
  faqCategory: any;
  private _unsubscribeAll: Subject<any> = new Subject();


  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private angularFunctions: AngularFireFunctions,
    private afs: AngularFirestore,) {
    route.params.subscribe(params => {
      this.id = params['id'];
    });
    //this.iconApp = firebase.initializeApp(environment.firebaseTestWebAppProxyCX);

  }

  ngOnInit(): void {

  }

  submit_information() {
    let messageText = {
      "message": "this is  a test"
    };
    /*var addMessage = this.iconApp.functions().httpsCallable('CheckAuthStatus');
    addMessage({ text: messageText, token: ""})
      .then((result) => {
        // Read result of the Cloud Function.
        //var sanitizedMessage = result.data.text;
        console.log(result)
      });*/
  }
  ngOnDestroy(): void
  {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

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
}
