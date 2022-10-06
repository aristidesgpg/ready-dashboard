import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, of, switchMap, throwError } from 'rxjs';
import { AuthUtils } from 'app/core/auth/auth.utils';
import { UserService } from 'app/core/user/user.service';
import { environment } from "../../../environments/environment";
import { AngularFireAuth } from "@angular/fire/auth";
import { ActivatedRoute, Router } from "@angular/router";
import { FuseSplashScreenService } from '@fuse/services/splash-screen';
import firebase from "firebase";
import auth = firebase.auth;

@Injectable()
export class AuthService {
    private _authenticated: boolean = false;

    public isRedirected: boolean = false;
    public customToken: firebase.functions.HttpsCallableResult | undefined;
    public customTokenData: any;
    public masterUserLoaded?: BehaviorSubject<any>;
    public readymasterApp?: firebase.app.App;
    public readymasterAppFireStore: firebase.firestore.Firestore | undefined;
    public readymasterAppStorage: firebase.storage.Storage | undefined;
    public realMasterData?: any;
    public testFirestore?: firebase.firestore.Firestore | undefined;
    public token: any;
    public userData: any;
    public userMasterData: any;
    public userMasterToken: any;
    public vfiSandboxApp?: firebase.app.App;

    constructor(
        private _afAuth: AngularFireAuth,
        private _httpClient: HttpClient,
        private _userService: UserService,
        private _activatedRoute: ActivatedRoute,
        private _router: Router,
        private _fuseSplashScreenService: FuseSplashScreenService,
    ) {
        console.log('INIT AUTHSERVICE')

        this.masterUserLoaded = new BehaviorSubject(false);
        this.readymasterApp = firebase.initializeApp(environment.firebaseMaster, "readymasterFirebase");
        this.vfiSandboxApp = firebase.initializeApp(environment.firebaseTestWebAppProxyCX, "vfiSanbox");
        this.readymasterAppFireStore = this.readymasterApp.firestore();
        this.readymasterAppStorage = this.readymasterApp.storage();

        this._afAuth.authState.subscribe(async user => {
            console.log("user: ", user)

            if (user) {
                this.userData = user;
                this.token = await user.getIdToken();

                const stringtoparse = JSON.stringify({ 'idToken': this.token, "appPackageName": "io.getready.rgn-web", })
                console.log('stringtoparse')
                console.log(stringtoparse)
                console.log('--------------')

                this.customToken = await this.readymasterApp.functions().httpsCallable('user-createCustomToken')(stringtoparse)
                console.log('customToken')
                console.log(this.customToken.data)
                console.log('--------------')

                this.customTokenData = this.customToken.data

                this.readymasterApp.auth().signInWithCustomToken(this.customTokenData).then((userCredential) => {
                    // Signed in
                    this.userMasterData = userCredential.user;

                    // Get user information
                    const userRef = this.readymasterAppFireStore.collection("users").doc(this.userMasterData?.uid)
                    userRef.get().then((docSnapshot) => {
                        const userRefData = docSnapshot.data();
                        console.log({ userRefData })

                        const createdAt = userRefData.createdAt
                            ? userRefData.createdAt
                            : firebase.firestore.FieldValue.serverTimestamp(); //value.user.metadata.creationTime,

                        const developerDashboardCreatedAt = userRefData.developerDashboardCreatedAt
                            ? userRefData.developerDashboardCreatedAt
                            : firebase.firestore.FieldValue.serverTimestamp(); //value.user.metadata.creationTime,

                        const data = {
                            rgnWebUserId: this.userData.uid,
                            userId: this.userMasterData?.uid,
                            email: this.userData.email,
                            displayName: this.userData.displayName,
                            emailVerified: this.userData.emailVerified,
                            createdAt: createdAt,
                            lastLoginAt: firebase.firestore.FieldValue.serverTimestamp(), // value.user.metadata.lastSignInTime,
                            developerDashboardCreatedAt: developerDashboardCreatedAt,
                        };

                        /**
                         * Update user data.
                         * Most of the information doesn't exists on first login.
                         */
                        userRef.set(data, { merge: true });

                        console.log('realMasterStatsPath docSnapshot')
                        console.log(docSnapshot.data())
                        console.log('--------------')

                        this._authenticated = true;
                        this.realMasterData = docSnapshot.data();
                        this.masterUserLoaded?.next(true);

                        const redirectURL = this._activatedRoute.snapshot.queryParamMap.get('redirectURL') || '/signed-in-redirect';

                        console.log('will call getIdToken()')
                        this.userMasterData.getIdToken().then((token: any) => {
                            console.log('getIdToken')
                            console.log(token)
                            console.log('--------------')

                            this.userMasterToken = token;
                            this.processDeveloper();
                        });

                        // Navigate to the redirect url
                        console.log('now it will redirect')
                        console.log(redirectURL)
                        console.log('--------------')
                        if (!this.isRedirected) {
                            this._router.navigateByUrl(redirectURL);
                        }
                    });

                    //const user:User = User();
                    //this._userService.user = user;
                    //localStorage.setItem('user', null);
                }).catch((error) => {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                }).finally(() => {
                    this._fuseSplashScreenService.hide();
                });
            } else {
                this.userData = user;
                this.userMasterData = null;
                this.masterUserLoaded?.next(false);
                this._fuseSplashScreenService.hide();
            }

            if (!this.userData?.photoURL) {
                this.userData = {
                    ...this.userData,
                    photoURL: 'assets/images/avatars/profile-default.png'
                };
            }

            if (!this.userData?.displayName) {
                this.userData = {
                    ...this.userData,
                    displayName: this.userData.email
                }
            }
        })
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter for access token
     */
    set accessToken(token: string) {
        localStorage.setItem('accessToken', token);
    }

    get accessToken(): string {
        return localStorage.getItem('accessToken') ?? '';
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

    private processDeveloper() {
        console.log('will call processNewDeveloper()')

        const processNewDeveloper = this.readymasterApp
            .functions()
            .httpsCallable('ProcessNewDeveloperUser');

        processNewDeveloper({ token: this.userMasterToken },)
            .then((result) => {
                console.log('result processNewDeveloper');
                console.log(result);
            });
    }

    private oAuthLogin(provider: auth.AuthProvider) {
        return this._afAuth.signInWithPopup(provider);
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Forgot password
     *
     * @param email
     */
    forgotPassword(email: string): Observable<any> {
        return this._httpClient.post('api/auth/forgot-password', email);
    }

    /**
     * Reset password
     *
     * @param password
     */
    resetPassword(password: string): Observable<any> {
        return this._httpClient.post('api/auth/reset-password', password);
    }

    /**
     * Sign in
     *
     * @param credentials
     */
    signIn(credentials: { email: string; password: string }): Observable<any> {
        // Throw error, if the user is already logged in
        if (this._authenticated) {
            return throwError('User is already logged in.');
        }

        return this._httpClient.post('api/auth/sign-in', credentials).pipe(
            switchMap((response: any) => {

                // Store the access token in the local storage
                this.accessToken = response.accessToken;

                // Set the authenticated flag to true
                this._authenticated = true;

                // Store the user on the user service
                this._userService.user = response.user;

                // Return a new observable with the response
                return of(response);
            })
        );
    }

    /**
     * Sign in using the access token
     */
    signInUsingToken(): Observable<any> {
        // Renew token
        return this._httpClient.post('api/auth/refresh-access-token', {
            accessToken: this.accessToken
        }).pipe(
            catchError(() =>

                // Return false
                of(false)
            ),
            switchMap((response: any) => {

                // Store the access token in the local storage
                this.accessToken = response.accessToken;

                // Set the authenticated flag to true
                this._authenticated = true;

                // Store the user on the user service
                this._userService.user = response.user;

                // Return true
                return of(true);
            })
        );
    }

    /**
     * Sign out
     */
    signOut(): Observable<any> {
        this._afAuth.signOut();
        // Remove the access token from the local storage
        localStorage.removeItem('accessToken');

        // Set the authenticated flag to false
        this._authenticated = false;

        // Return the observable
        return of(true);
    }

    /**
     * Sign up
     *
     * @param user
     */
    signUp(user: { name: string; email: string; password: string; company: string }): Observable<any> {
        return this._httpClient.post('api/auth/sign-up', user);
    }

    /**
     * Unlock session
     *
     * @param credentials
     */
    unlockSession(credentials: { email: string; password: string }): Observable<any> {
        return this._httpClient.post('api/auth/unlock-session', credentials);
    }

    /**
     * Check the authentication status
     */
    check(): Observable<boolean> {
        // Check if the user is logged in
        if (this._authenticated) {
            return of(true);
        }

        // Check the access token availability
        if (!this.accessToken) {
            return of(false);
        }

        // Check the access token expire date
        if (AuthUtils.isTokenExpired(this.accessToken)) {
            return of(false);
        }

        // If the access token exists and it didn't expire, sign in using it
        return this.signInUsingToken();
    }

    /**
     * Logout user from application
     */
    logout() {
        this._afAuth.signOut().then(() => {
            //this.router.navigate(['/']);
            //window.location.reload();
        });

        this.userData = null;
        this.userMasterData = null;
        this.masterUserLoaded?.next(false);
    }

    /**
     * Login with e-mail and password
     *
     * @param email
     * @param password
     */
    login(email: string, password: string): Promise<any> {
        return this._afAuth.signInWithEmailAndPassword(email, password)
    }

    /**
     * Signup with email and password
     *
     * @param email
     * @param password
     */
    emailSignup(email: string, password: string): Promise<any> {
        return this._afAuth.createUserWithEmailAndPassword(email, password)
    }

    /**
     * Login using google
     */
    async googleLogin() {
        const provider = new firebase.auth.GoogleAuthProvider();
        return this.oAuthLogin(provider)
            .then(value => {
                console.log('login google')
                console.log(value)

                // Add a new document in collection "cities"
                this.userMasterData = value.user;

                // console.log('will call processNewDeveloper()')
                // const processNewDeveloper = this.readymasterApp
                //     .functions()
                //     .httpsCallable('ProcessNewDeveloperUser');

                // processNewDeveloper({ token: this.userMasterToken },)
                //     .then((result) => {
                //         console.log('result processNewDeveloper');
                //         console.log(result);
                //     });

                console.log('Sucess', value);
                console.log(this.realMasterData?.isApprovedDeveloper, 'hyi');

                if (!this.realMasterData?.isApprovedDeveloper) {
                    this._router.navigateByUrl('/welcome/sign-up-flow');
                } else {
                    this._router.navigateByUrl('/welcome/aura');
                }
            })
            .catch(error => {
                console.log('Something went wrong: ', error);
            });
    }

    /**
     * Login using facebook
     */
    async facebookLogin() {
        const provider = new firebase.auth.FacebookAuthProvider();
        return this.oAuthLogin(provider)
            .then(value => {
                console.log('Sucess', value)
                if (!this.realMasterData?.isApprovedDeveloper) {
                    this._router.navigateByUrl('/welcome/sign-up-flow');
                } else {
                    this._router.navigateByUrl('/welcome/aura');
                }
            })
            .catch(error => {
                console.log('Something went wrong: ', error);
            });
    }

    async appleLogin() {
        var provider = new firebase.auth.OAuthProvider('apple.com');
        return this.oAuthLogin(provider)
            .then(value => {
                console.log('Sucess', value),
                    this._router.navigateByUrl('/home');
            })
            .catch(error => {
                console.log('Something went wrong: ', error);
            });
    }

    forgotPasswordViaEmail(email: string): Promise<any> {
        return this._afAuth.sendPasswordResetEmail(email);
    }

    resetUserPassword(password: string, code: string): Promise<any> {
        return this._afAuth.confirmPasswordReset(code, password);
    }
}
