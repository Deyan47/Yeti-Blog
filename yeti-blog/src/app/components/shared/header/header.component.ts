import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/core/models/user/user';
import { UserServiceService } from '../../../core/services/user/user-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  public isAdmin: boolean = false;
  public isAdminDropdownShown: boolean = false;

  get isLogged(): boolean {
    return this.userService.isLogged;
  }
  get user(): User {
    return this.userService.currentUser;
  }

  constructor(private userService: UserServiceService, private router: Router) {
    this.isAdmin = this.userService.isAdmin;
  }

  ngOnInit() {}

  logout() {
    this.userService.logout();
    this.router.navigateByUrl('/');
  }

  toggleAdminDropdown() {
    this.isAdminDropdownShown = !this.isAdminDropdownShown;
  }
}