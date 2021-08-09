import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { interval, Subscription } from 'rxjs';

import { BlogService } from 'src/app/core/services/blog/blog.service';
import { ImgService } from 'src/app/core/services/img/img.service';
import { UserServiceService } from 'src/app/core/services/user/user-service.service';

@Component({
  selector: 'app-create-blog',
  templateUrl: './create-blog.component.html',
  styleUrls: ['./create-blog.component.css'],
})
export class CreateBlogComponent {
  error: any;
  private subscriptions: Array<Subscription> = [];

  isLoading: boolean = false;

  blog: any = {
    title: '',
    imgUrl: '',
    content: '',
    tags: [],
  };
  tags: string = '';

  constructor(
    private blogService: BlogService,
    private router: Router,
    private imageUploadService: ImgService,
    private userService: UserServiceService
  ) {}

  public ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }

  get isFrozen(): boolean {
    return this.userService.currentUser.isFrozen!;
  }

  async onSubmit(blogImg: HTMLInputElement) {
    this.isLoading = true;
    if (
      (this.blog.title != '' && this.blog.content != '') ||
      blogImg == undefined
    ) {
      await this.imageUploadService.uploadImage(
        this.blog.title,
        blogImg,
        'BlogImages'
      );

      this.subscriptions.push(
        interval(3000)
          .pipe()
          .subscribe(() => {
            this.blog.tags = this.tags.replace(' ', '').split(',');
            this.blogService.addNewBlog(
              this.blog.title,
              (this.blog.imgUrl = this.imageUploadService.fileLink),
              this.blog.content,
              this.blog.tags
            );
            this.error = {};
            this.isLoading = false;
            this.router.navigateByUrl('blogs/all');
          })
      );
    } else {
      this.isLoading = false;
      this.error = {
        title: 'Error!',
        message: 'All fields are required!',
        class: 'danger',
      };
      interval(3000).subscribe(() => {
        this.error = {};
      });
    }
  }
}