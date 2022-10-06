import firebase from "firebase";

export class Friends{
  constructor(
    readonly friends: string[],
  ) {}
}

export const friendConverter = {
  toFirestore(friendConverter: Friends): firebase.firestore.DocumentData {
    return {friends: friendConverter.friends};
  },
  fromFirestore(
    snapshot: firebase.firestore.QueryDocumentSnapshot,
    options: firebase.firestore.SnapshotOptions
  ): Friends {
    const data = snapshot.data(options)!;
    return new Friends(
      data.friends,
    );
  }
};


export class MasterUser{
  constructor(
    readonly userId: string,
    readonly token: string,
    readonly shortUID: string,
    readonly displayName: string,
    readonly email: string,
    readonly avatarPath: string,
    readonly clientType: number,
    readonly isReadyAdmin: boolean
  ) {}
}

export const masterUserConverter = {
  toFirestore(masterUserConverter: MasterUser): firebase.firestore.DocumentData {
    return {userId: masterUserConverter.userId, token: masterUserConverter.token};
  },
  fromFirestore(
    snapshot: firebase.firestore.QueryDocumentSnapshot,
    options: firebase.firestore.SnapshotOptions
  ): MasterUser {
    const data = snapshot.data(options)!;
    return new MasterUser(
      data.userId,
      data.token,
      data.shortUID,
      data.displayName,
      data.email,
      data.avatarPath,
      data.clientType,
      data.isReadyAdmin
    );
  }
};
