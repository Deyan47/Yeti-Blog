import { Injectable } from '@angular/core';
import { Blog } from '../../models/blog/blog';
import { Achievment } from '../../models/user/achievment';
import { User } from '../../models/user/user';
@Injectable()
export class UserService {
  public achievmentImgUrl: string =
    'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Star_full.svg/1200px-Star_full.svg.png';

  constructor() {}

  private achievment: Achievment = {
    imgUrl: this.achievmentImgUrl,
    content: '5 Blogs written',
  };

  private user: User = {
    id: 'default-user-id',
    username: 'default-user',
    email: 'default-user@email.com',
    bio: 'aaaaaaaaaasdadasdadadadasdadasdasdsadasdsadsadsadadadasddddddddddddddds',
    password: 'default-user-password',
    imgUrl:
      'https://img.pixers.pics/pho_wat(s3:700/FO/43/95/47/18/700_FO43954718_9b0e8c7a523456b309618f7614ae3d51.jpg,700,700,cms:2018/10/5bd1b6b8d04b8_220x50-watermark.png,over,480,650,jpg)/wall-murals-cute-blue-yeti.jpg.jpg',
    achievements: [this.achievment],
    blogs: [],
  };

  get isLogged(): boolean {
    return localStorage['isLogged'] != undefined;
  }

  login(email: string, password: string) {
    localStorage.setItem('isLogged', email);
  }

  register(
    username: string,
    email: string,
    password: string,
    bio: string,
    imgUrl: string
  ) {
    localStorage.setItem('userImg', imgUrl);
    localStorage.setItem('isLogged', email);
  }

  logout() {
    localStorage.removeItem('isLogged');
  }

  get getUserPic(): string {
    return this.currentUser.imgUrl;
  }

  getUserById(userId: string): User {
    return this.currentUser;
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
    this.checkIfUserIsEligbleForAchievement(this.currentUser);

    // this.userDoc = this.afs.doc(`users/${user.id}`);
    // this.userDoc.update(user);
  }

  addBlogToUser(blog: Blog) {
    this.currentUser.blogs?.push(blog);
    this.updateUser();
  }

  get currentUser(): User {
    return this.user;
  }
}