import { Injectable } from '@angular/core';

import { BlogService } from '../../services/blog/blog.service';

@Injectable()
export class UserService {
  constructor(private blogService: BlogService) {}

  get isLogged(): boolean {
    return true;
  }

  get getUserPic(): string {
    return 'https://i.ytimg.com/vi/MPV2METPeJU/maxresdefault.jpg';
  }
}