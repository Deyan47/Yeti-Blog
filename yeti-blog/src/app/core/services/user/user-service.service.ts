import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../../models/user/user';
import { Visitation } from '../../models/user/visitation';

import { auth } from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from 'angularfire2/firestore';

@Injectable()
export class UserServiceService {

  private userFromGoogleLogin: any;

  userInfo!: any;
  usersCollection!: AngularFirestoreCollection<User>;
  userDoc!: AngularFirestoreDocument<User>;
  users!: Observable<User[]>;

  constructor(
    private fireAuth: AngularFireAuth,
    private router: Router,
    public afs: AngularFirestore
  ) {
    this.usersCollection = this.afs.collection('users');
    this.users = this.usersCollection.snapshotChanges().pipe(
      map((changes) => {
        return changes.map((a) => {
          const data = a.payload.doc.data() as User;
          data.id = a.payload.doc.id;
          return data;
        });
      })
    );
  }

  get isLogged(): boolean {
    return localStorage['user_data'] != undefined;
  }
  get isAdmin(): boolean {
    if (this.isLogged) {
      return JSON.parse(localStorage['user_data']).isAdmin != undefined;
    }
    return false;
  }

  login(email: string, password: string) {
    return this.fireAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then((userData) => {
        this.users.subscribe((users) => {
          let user = users.filter((x) => x.email === email)[0];
          this.addUserToLocalStorage(JSON.stringify(user));
          this.router.navigateByUrl('/');
        });
      });
  }

  register(
    username: string,
    email: string,
    password: string,
    bio: string,
    imgUrl: string
  ) {
    return this.fireAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then((userData) => {
        let user: User = {
          firebaseId: userData.user!.uid!,
          username: username,
          email: email,
          bio: bio,
          imgUrl: imgUrl,
          visitations: [],
          achievements: [],
        };

        this.usersCollection.add(user);

        this.users.subscribe((users) => {
          user.id = users.filter((x) => x.email === email)[0].id;
          this.addUserToLocalStorage(JSON.stringify(user));
        });
      })
      .finally(() => {
        this.router.navigateByUrl('/');
      });
  }

  googleAuth(usersArr: User[]) {
    return this.authLogin(new auth.GoogleAuthProvider(), usersArr);
  }

  authLogin(provider: any, usersArr: User[]) {
    return this.fireAuth.auth
      .signInWithPopup(provider)
      .then((result) => {
        this.addGoogleLoginToLocalStorage(Object.values(result), usersArr);
        this.router.navigateByUrl('/');
      })
      .catch((error) => {
        alert(error.message);
      });
  }

  logout() {
    return this.fireAuth.auth
      .signOut()
      .catch((err) => alert(err.message))
      .finally(() => {
        localStorage.removeItem('user_data');
        this.router.navigateByUrl('/');
      });
  }

  addUserToLocalStorage(userData: any) {
    localStorage['user_data'] = userData;
  }

  addGoogleLoginToLocalStorage(dataFromGoogle: any, usersArr: User[]) {
    this.userFromGoogleLogin = usersArr.filter(
      (x) => x.firebaseId == dataFromGoogle[0].uid
    )[0];

    if (this.userFromGoogleLogin) {
      localStorage['user_data'] = JSON.stringify({
        id: this.userFromGoogleLogin.id,
        bio: this.userFromGoogleLogin.bio,
        email: dataFromGoogle[0].email,
        firebaseId: dataFromGoogle[0].uid,
        imgUrl: this.userFromGoogleLogin.imgUrl,
        username: this.userFromGoogleLogin.username,
        isAdmin: this.userFromGoogleLogin.isAdmin,
        isFrozen: this.userFromGoogleLogin.isFrozen,
      });
    }
  }

  updateUser(user: User) {
    this.userDoc = this.afs.doc(`users/${user.id}`);
    this.userDoc.update(user);
  }

  get currentUser(): User {
    this.userInfo = JSON.parse(localStorage['user_data']);
    return this.userInfo as User;
  }

  getAllUsers() {
    return this.users;
  }

  freezeUser(user: User) {
    user.isFrozen = true;
    this.updateUser(user);
  }
  unFreezeUser(user: User) {
    user.isFrozen = false;
    this.updateUser(user);
  }

  addProfileVisitation(user: User) {
    if (this.isLogged && this.currentUser.id != user.id) {
      let visitation: Visitation = {
        visitedOn: new Date().toLocaleString(),
        visitedBy: this.currentUser,
      };
      user.visitations?.push(visitation);
    }
  }
}