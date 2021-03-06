import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Blog } from 'src/app/core/models/blog/blog';
import { BlogService } from 'src/app/core/services/blog/blog.service';

@Component({
  selector: 'app-admin-blogs',
  templateUrl: './admin-blogs.component.html',
  styleUrls: ['./admin-blogs.component.css'],
})
export class AdminBlogsComponent implements OnInit {

  blogs$!: Observable<Blog[]>;

  constructor(private blogService: BlogService) {}

  ngOnInit(): void {
    this.blogs$ = this.blogService.getAllBlogs();
  }

  deleteBlog(blog: Blog) {
    if (confirm('Are you sure you want to delete this blog?')) {
      this.blogService.deleteBlog(blog);
    }
  }
}