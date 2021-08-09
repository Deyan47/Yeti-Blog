import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { UserServiceService } from '../../../core/services/user/user-service.service';
import { User } from 'src/app/core/models/user/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  private users!: User[];
  formDisplay: boolean = true;
  loaderDisplay: boolean = false;

  constructor(private userService: UserServiceService, private router: Router) {
    this.users = [];
  }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe((users) => {
      users.forEach((user) => this.users.push(user));
    });
  }

  onLogin(formData: NgForm) {
    this.formDisplay = false;
    this.loaderDisplay = true;

    const email = formData.controls.email.value;
    const password = formData.controls.password.value;

    if (email != '' && password != '') {
      this.userService.login(email, password).catch((err) => {
        alert(err.message);
      });
    }
    this.formDisplay = true;
    this.loaderDisplay = false;
  }

  googleAuth() {
    this.formDisplay = false;
    this.loaderDisplay = true;
    this.userService.googleAuth(this.users);
  }
}