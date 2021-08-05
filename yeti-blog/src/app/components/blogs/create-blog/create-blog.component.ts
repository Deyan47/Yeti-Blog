import { Component } from '@angular/core';
//import { AngularFireStorage } from '@angular/fire/storage';
import { interval, Subscription } from 'rxjs';
import { AngularFireStorage } from 'angularfire2/storage'

import { Router } from '@angular/router';
import { BlogService } from 'src/app/core/services/blog/blog.service';
import { ImgService } from 'src/app/core/services/img/img.service';

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
    private storage: AngularFireStorage,
    private blogService: BlogService,
    private router: Router,
    private imageUploadService: ImgService
  ) {}

  public ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
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