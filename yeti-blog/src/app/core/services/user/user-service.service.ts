import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { interval, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Blog } from '../../models/blog/blog';
import { Achievment } from '../../models/user/achievment';
import { User } from '../../models/user/user';

import * as firebase from 'firebase/app';
//import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireAuthModule } from "@angular/fire/auth";
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from 'angularfire2/firestore';
import { AngularFireModule } from 'angularfire2';

//import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';

@Injectable()
export class UserServiceService {
  public achievmentImgUrl: string =
    'https://img.pixers.pics/pho_wat(s3:700/FO/43/95/47/18/700_FO43954718_9b0e8c7a523456b309618f7614ae3d51.jpg,700,700,cms:2018/10/5bd1b6b8d04b8_220x50-watermark.png,over,480,650,jpg)/posters-cute-blue-yeti.jpg.jpg';

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

  

  checkIfUserIsEligbleForAchievement(blogsWritten: number) {
    let achievments = Array<Achievment>();
    if (blogsWritten >= 1)
      achievments.push({
        content: '1 blog written!',
        imgUrl: this.achievmentImgUrl,
      });
    if (blogsWritten >= 5)
      achievments.push({
        content: '5 blogs written!',
        imgUrl: this.achievmentImgUrl,
      });
    if (blogsWritten >= 10)
      achievments.push({
        content: '10 blogs written!',
        imgUrl: this.achievmentImgUrl,
      });
    if (blogsWritten >= 20)
      achievments.push({
        content: '20 blogs written!',
        imgUrl: this.achievmentImgUrl,
      });
    if (blogsWritten >= 50)
      achievments.push({
        content: '50 blogs written!',
        imgUrl: this.achievmentImgUrl,
      });
    if (blogsWritten >= 100)
      achievments.push({
        content: '100 blogs written!',
        imgUrl: this.achievmentImgUrl,
      });

    return achievments;
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
}