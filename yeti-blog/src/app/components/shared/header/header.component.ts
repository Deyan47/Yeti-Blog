import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { User } from 'src/app/core/models/user/user';
import { UserServiceService } from '../../../core/services/user/user-service.service';

import { AngularFireStorage } from 'angularfire2/storage';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})

export class HeaderComponent implements OnInit {
  public isLogged: boolean = false;
  public user!: User;

  constructor(private userService: UserServiceService, private router: Router) {}

  ngOnInit() {
    this.isLogged = this.userService.isLogged;
    if (this.isLogged) {
      this.user = this.userService.currentUser;
    }
    console.log(this.user);
  }

  logout() {
    this.userService.logout();
    window.location.reload();
    this.router.navigateByUrl('/');
  }
}