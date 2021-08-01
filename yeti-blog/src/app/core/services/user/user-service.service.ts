import { Injectable } from '@angular/core';

import { BlogService } from '../../services/blog/blog.service';

@Injectable()
export class UserService {
  constructor(private blogService: BlogService) {}

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
    return localStorage['userImg'];
  }
}