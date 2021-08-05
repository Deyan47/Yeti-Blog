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
    public afs: AngularFirestore,
    
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

    if (localStorage['user_data']) {
      this.userInfo = JSON.parse(localStorage['user_data']);
    }
  }
  

  get isLogged(): boolean {
    return localStorage['user_data'] != undefined;
  }

  login(email: string, password: string) {
    return this.fireAuth.auth.signInWithEmailAndPassword(email, password)
      .then((userData:any) => {
        this.users.subscribe((users) => {
          let user = users.filter((x) => x.email === email)[0];
          this.addUserToLocalStorage(JSON.stringify(user));
        });
      })
      .catch((err:any) => alert(err.message))
      .finally(() => {
        this.router.navigateByUrl('/');
      });
  }

  register(
    username: string,
    email: string,
    password: string,
    bio: string,
    imgUrl: string
  ) {
    return this.fireAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((userData:any) => {
        let user: User = {
          firebaseId: userData.user!.uid!,
          username: username,
          email: email,
          bio: bio,
          likes: [],
          blogs: [],
          comments: [],
          views: [],
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
    return this.fireAuth.auth.signOut()
      .then((data:any) => {})
      .catch((err:any) => alert(err.message))
      .finally(() => {
        localStorage.removeItem('user_data');
        this.router.navigateByUrl('/');
        window.location.reload();
      });
  }

  addUserToLocalStorage(userData: any) {
    localStorage['user_data'] = userData;
  }

  get getUserPic(): string {
    return this.currentUser.imgUrl;
  }

  addAchievmentToUser(user: User, text: string) {
    user.achievements?.push({ content: text, imgUrl: this.achievmentImgUrl });
  }

  checkIfUserIsEligbleForAchievement(user: User) {
    var blogsWritten = user.blogs!.length;

    switch (blogsWritten) {
      case 1:
        this.addAchievmentIsNotYetEarned(user, 'First blog written!');
        break;
      case 5:
        this.addAchievmentIsNotYetEarned(user, '5 blog written!');
        break;
      case 10:
        this.addAchievmentIsNotYetEarned(user, '10 blog written!');
        break;
      case 20:
        this.addAchievmentIsNotYetEarned(user, '20 blog written!');
        break;
      case 50:
        this.addAchievmentIsNotYetEarned(user, '50 blog written!');
        break;
      case 100:
        this.addAchievmentIsNotYetEarned(user, '100 blog written!');
        break;
    }
  }

  addAchievmentIsNotYetEarned(user: User, content: string) {
    if (!user.achievements?.some((x) => x.content.includes(content))) {
      user.achievements?.push({
        content: content,
        imgUrl: this.achievmentImgUrl,
      });
    }
  }

  updateUser() {
    //this.checkIfUserIsEligbleForAchievement(this.currentUser);

    this.userDoc = this.afs.doc(`users/${this.currentUser.id}`);
    this.userDoc.update(this.currentUser);
  }

  get currentUser(): User {
    return this.userInfo as User;
  }
}