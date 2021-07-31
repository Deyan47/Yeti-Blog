import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { BlogService } from 'src/app/core/services/blog/blog.service';

@Component({
  selector: 'app-create-blog',
  templateUrl: './create-blog.component.html',
  styleUrls: ['./create-blog.component.css'],
})
export class CreateBlogComponent implements OnInit {
  blog: any = {
    title: '',
    imgUrl: '',
    content: '',
    tags: [],
  };
  tags: string = '';

  constructor(private blogService: BlogService, private router: Router) {}

  ngOnInit(): void {}

  onSubmit() {
    if (
      this.blog.title != '' &&
      this.blog.imgUrl != '' &&
      this.blog.content != ''
    ) {
      this.blog.tags = this.tags.replace(' ', '').split(',');
      this.blogService.addNewBlog(
        this.blog.title,
        this.blog.imgUrl,
        this.blog.content,
        this.blog.tags
      );
      this.router.navigateByUrl('blogs');
    }
  }
}