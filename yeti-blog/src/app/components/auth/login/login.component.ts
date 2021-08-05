import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../../../core/services/user/user-service.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private userService: UserServiceService, private router: Router) {}

  ngOnInit(): void {}

  onLogin(email: string, password: string) {
    this.userService.login(email, password);
  }
}