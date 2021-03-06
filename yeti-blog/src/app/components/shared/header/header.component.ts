import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/core/models/user/user';
import { UserServiceService } from '../../../core/services/user/user-service.service';
import { AchievementService } from 'src/app/core/services/achievement/achievement.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {

  get isLogged(): boolean {
    return this.userService.isLogged;
  }

  get isAdmin(): boolean {
    return this.userService.isAdmin;
  }

  get user(): User {
    return this.userService.currentUser;
  }

  constructor(
    private userService: UserServiceService,
    private router: Router,
    private achievementService: AchievementService,
  ) {}

  ngOnInit() {}

  logout() {
    this.userService.logout();
    this.router.navigateByUrl('/');
  }

}