import {Component, Input, OnInit, SimpleChanges} from '@angular/core';
import firebase from "firebase";
import {environment} from "../../../environments/environment";
import {AuthService} from "../../core/auth/auth.service";

@Component({
  selector: 'app-avatar-picture',
  templateUrl: './avatar-picture.component.html',
  styleUrls: ['./avatar-picture.component.scss']
})
export class AvatarPictureComponent implements OnInit {
  @Input()
  bundleId?: string;
  @Input()
  userId?: string;

  @Input()
  size?: string = 'small'

  secondaryAppStorage?: firebase.storage.Storage;
  avatarPicture?:any;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.secondaryAppStorage = this.authService.readymasterAppStorage
    this.secondaryAppStorage?.refFromURL(environment.firestoragePath+'/users/'+this.userId+'/profilePicture.png')
        .getDownloadURL().then((url) => {
          this.avatarPicture = url;

        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          if (errorCode == 'storage/object-not-found'){
            this.avatarPicture = "/assets/shared/icon_guest_profile.svg";
          }
          // ...
        });
  }
}
