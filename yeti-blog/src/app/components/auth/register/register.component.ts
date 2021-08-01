import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { interval, Observable, Subscription } from 'rxjs';
import { UserService } from 'src/app/core/services/user/user-service.service';
import { Router } from '@angular/router';
import { ImgService } from 'src/app/core/services/img/img.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  private subscriptions: Array<Subscription> = [];
  constructor(
    private ImgService: ImgService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  public ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }

  onRegister(
    username: string,
    email: string,
    password: string,
    confirmPassword: string,
    bio: string,
    profilePic: HTMLInputElement
  ) {
    this.ImgService.uploadImage(username, profilePic, 'ProfileImages');

    this.subscriptions.push(
      interval(3000)
        .pipe()
        .subscribe(() => {
          this.userService.register(
            username,
            email,
            password,
            bio,
            this.ImgService.fileLink
          );

          this.router.navigateByUrl('/');
          window.location.reload();
        })
    );
  }
}