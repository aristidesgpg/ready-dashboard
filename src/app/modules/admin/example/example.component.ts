import { Component, ViewEncapsulation } from '@angular/core';
import {AuthService} from "../../../core/auth/auth.service";
import {friendConverter, Friends, masterUserConverter} from "../../../master-user.model";
import {AngularFireDatabase, AngularFireList} from "@angular/fire/database";
import {AngularFirestore} from "@angular/fire/firestore";
import {Observable} from "rxjs";

export default class Post {
    key?: string | null;
    title?: string;
    DateCreated?: Date;
    ThumbnailURL?: string;
    BodyTXT?: string;
}

export class UserStats {
    trophies?: number;
}

@Component({
    selector     : 'example',
    templateUrl  : './example.component.html',
    encapsulation: ViewEncapsulation.None
})

export class ExampleComponent
{
    private docs: any;
    allPostsReference: AngularFireList<Post>;
    collections: Observable<any[]>;
    allPosts: Observable<Post[]>;
    contacts$: Observable<any[]>;
    selectedContact: any;
    /**
     * Constructor
     */
    constructor(private authService: AuthService,db: AngularFireDatabase, firestore: AngularFirestore)
    {
        this.collections = firestore.collection('test-collection').valueChanges()
        this.allPostsReference = db.list('/AllPosts');
        this.allPosts = this.allPostsReference.valueChanges();
    }

    friends?: Friends
    realMasterData?: any;

    players?: any;


    ngOnInit(): void {



        //this.docs = this.authService.secondaryAppFireStore?.collection(usersdocumentPath).valueChanges()

        let usersdocumentPath = '/users/'
        this.authService.readymasterAppFireStore?.collection(usersdocumentPath)
          .where('email', '==', 'martin@getready.io')
          .onSnapshot((doc) => {
            this.realMasterData = doc.docs;
        });


        let documentPath = '/friends/'+this.authService.realMasterData.userId
        this.authService.readymasterAppFireStore?.doc(documentPath)
          .withConverter(friendConverter).onSnapshot((doc) => {
            this.friends = doc.data();
        });


        this.authService.readymasterAppFireStore?.collection(usersdocumentPath)
          .where('displayName', '==', 'Tag')
          .onSnapshot((doc) => {
              this.players = doc.docs;
          });

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
}
