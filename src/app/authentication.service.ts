import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {AngularFireAuth} from "@angular/fire/auth";
import firebase from "firebase";
import auth = firebase.auth;
import store = firebase.firestore
import {environment} from "../environments/environment";
import { AngularFireFunctions } from '@angular/fire/functions';
import {BehaviorSubject, Observable} from "rxjs";
import {AngularFirestore} from "@angular/fire/firestore";
import {AngularFireModule} from "@angular/fire";

import {masterUserConverter} from "./master-user.model";

@Injectable({
    providedIn:  'root'
})


export class AuthServiceFireBase {

  //myObservable: Observable<any[]>;
  //metadata: UserStats
  token: any;
  customToken: firebase.functions.HttpsCallableResult | undefined;
  customTokenData: any;
  userData: any;
  userMasterData: any;
  realMasterData?: any;
  collections: any;
  collectionsTwo: any;
  //iconDoc: firebase.firestore.DocumentData | undefined;
  //iconSnapshotDoc: UserStach | undefined
  secondaryAppFireStore: firebase.firestore.Firestore | undefined;
  secondaryAppStorage: firebase.storage.Storage | undefined;
  publicAppFireStore?: firebase.firestore.Firestore



  totalMedals: number = 0;
  totalTrophies: number = 0;

  masterUserLoaded?:BehaviorSubject<any>;

  constructor(
    public afAuth: AngularFireAuth,
    private router: Router,
    private functions: AngularFireFunctions) {

    this.masterUserLoaded = new BehaviorSubject(false);
    //const publicApp = firebase.initializeApp(environment.firebaseMaster, "public");
    this.publicAppFireStore = undefined//publicApp.firestore();
    this.secondaryAppStorage = undefined//publicApp.storage();



    /* Saving user data in localstorage when
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe(async user => {
      if (user) {



        //const secondaryApp = firebase.initializeApp(environment.firebaseMaster, "secondary_todelete");

        this.userData = user;
        this.token = await user.getIdToken();


        /*var stringtoparse = JSON.stringify({'idToken': this.token, "appPackageName" : "io.getready.triggermasters",})
        console.log(stringtoparse)
        this.customToken = await secondaryApp.functions().httpsCallable('user-createCustomToken')(stringtoparse)
        console.log(this.customToken.data)
        this.customTokenData = this.customToken.data

        const auth1 = secondaryApp.auth().signInWithCustomToken(this.customTokenData).then((userCredential) => {
          // Signed in
          this.userMasterData = userCredential.user;

          let realMasterStatsPath = '/users/'+this.userMasterData?.uid
          this.secondaryAppFireStore?.doc(realMasterStatsPath)
            .withConverter(masterUserConverter).onSnapshot((doc) => {
                this.realMasterData = doc.data()
            });

          this.masterUserLoaded?.next(true);
          let match3dCollectionStatsPath = '/userStats/'+this.userMasterData?.uid+'/games/'

          let pinballCollectionStatsPath = '/userStats/'+this.userMasterData?.uid+'/games/'

        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          // ...
        });
        */
        //this.secondaryAppFireStore = secondaryApp.firestore();




      /*
        var collectionPath = '/users/PCN65WN7ptduOByyNTJEVAETIrj2/'
        var collectionStatsPath = '/userStats/PCN65WN7ptduOByyNTJEVAETIrj2/games/'

        this.secondaryAppFireStore.collection(collectionStatsPath).get().then((querySnapshot) => {
            this.collections = querySnapshot.docs
              querySnapshot.forEach((doc) => {
                console.log(`${doc.id} => ${doc.data()}`);
            });
        });

       */
      /*
        var docRef = this.secondaryAppFireStore.collection(collectionStatsPath).doc("io.getready.icon");

        docRef.get().then((doc) => {
            if (doc.exists) {
              this.iconDoc = doc.data()
                console.log("Document data:", doc.data());
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });*/
        /*
        this.secondaryAppFireStore.collection(collectionStatsPath).doc("io.getready.icon")
          .withConverter(userStachConverter).onSnapshot((doc) => {
              var source = doc.metadata.hasPendingWrites ? "Local" : "Server";
              console.log(source, " data: ", doc.data());
              this.iconSnapshotDoc = doc.data()
              //this.metadata.trophies = doc.data()
            console.log(doc.data()?.draws);
          });*/



        //secondaryAppFireStore.collection("friends").get().then((querySnapshot) => {
        //    querySnapshot.forEach((doc) => {
        //        console.log(`${doc.id} => ${doc.data()}`);
        //    });
        //});



          //this.collections = secondaryAppFireStore.doc(collectionPath).get()

          //this.collectionsTwo = secondaryAppFireStore.collection('users')
           // .doc('PCN65WN7ptduOByyNTJEVAETIrj2').get()




        //console.log(auth1)

        /*const db = secondaryApp.firestore();

        db.collection("friends").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                console.log(`${doc.id} => ${doc.data()}`);
            });
        });*/


        //localStorage.setItem('user', JSON.stringify(this.userData));
        //JSON.parse(localStorage.getItem('user'));
      } else {
        this.userData = user;
        this.userMasterData = null;
        this.masterUserLoaded?.next(false);
        //localStorage.setItem('user', null);
        //JSON.parse(localStorage.getItem('user'));
      }
    })
  }

  login(email: string, password: string) {
    this.afAuth.signInWithEmailAndPassword(email, password)
    .then(value => {
      console.log('Nice, it worked!');
      //this.router.navigateByUrl('/project');
      this.router.navigateByUrl('/welcome/aura');
    })
    .catch(err => {
      console.log('Something went wrong: ', err.message);
    });
  }

  emailSignup(email: string, password: string) {
    this.afAuth.createUserWithEmailAndPassword(email, password)
    .then(value => {
     console.log('Sucess', value);

     //this.router.navigateByUrl('/profile');
     this.router.navigateByUrl('/welcome/aura');
    })
    .catch(error => {
      console.log('Something went wrong: ', error);
    });
  }

  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.oAuthLogin(provider)
      .then(value => {
     console.log('Sucess', value);
     //this.router.navigateByUrl('/project');
     this.router.navigateByUrl('/welcome/aura');
   })
    .catch(error => {
      console.log('Something went wrong: ', error);
    });
  }

  facebookLogin() {
    const provider = new firebase.auth.FacebookAuthProvider();
    return this.oAuthLogin(provider)
      .then(value => {
     console.log('Sucess', value);
     this.router.navigateByUrl('/welcome/aura');
     //this.router.navigateByUrl('/home');
   })
    .catch(error => {
      console.log('Something went wrong: ', error);
    });
  }

  appleLogin() {
    var provider = new firebase.auth.OAuthProvider('apple.com');
    return this.oAuthLogin(provider)
      .then(value => {
     console.log('Sucess', value),
     this.router.navigateByUrl('/home');
   })
    .catch(error => {
      console.log('Something went wrong: ', error);
    });
  }

  logout() {
    this.afAuth.signOut().then(() => {
      this.router.navigate(['/']);
      window.location.reload();
    });
  }

  private oAuthLogin(provider: auth.AuthProvider) {
    return this.afAuth.signInWithPopup(provider);
  }
}

export class UserStach {
  constructor(readonly title: string, readonly draws: string) {}

  toString(): string {
    return this.title + ', by ' + this.draws;
  }
}

const userStachConverter = {
  toFirestore(userStach: UserStach): firebase.firestore.DocumentData {
    return {title: userStach.title, draws: userStach.draws};
  },
  fromFirestore(
    snapshot: firebase.firestore.QueryDocumentSnapshot,
    options: firebase.firestore.SnapshotOptions
  ): UserStach {
    const data = snapshot.data(options)!;
    return new UserStach(data.title, data.draws);
  }
};
