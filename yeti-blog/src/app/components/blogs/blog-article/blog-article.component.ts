import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from '../../../core/services/blog/blog.service';
import { Blog } from '../../../core/models/blog/blog';
import { Router } from '@angular/router';
import { interval } from 'rxjs';
import { UserServiceService } from 'src/app/core/services/user/user-service.service';

@Component({
  selector: 'app-blog-article',
  templateUrl: './blog-article.component.html',
  styleUrls: ['./blog-article.component.css'],
})
export class BlogArticleComponent implements OnInit {
  isClicked = false;
  editState: boolean = false;
  commentingState: boolean = false;
  canEdit: boolean = false;
  isAdmin: boolean = false;
  isLogged: boolean = false;
  error: any;

  blogToEdit!: Blog;
  commentToAdd!: string;

  blog!: Blog;
  id: string | null = '';

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService,
    private router: Router,
    private userService: UserServiceService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') as string;
    this.blogService.getAllBlogs().subscribe((blogs) => {
      this.blog = blogs.filter((x) => x.id === this.id)[0];
      this.blog.comments?.sort((a, b) =>
        b.createdOn.localeCompare(a.createdOn)
      );
    });
  }

  ngAfterContentChecked() {
    this.isLogged = this.userService.isLogged;
    this.isAdmin = this.userService.isAdmin;
    if (this.blog && this.isLogged) {
      this.canEdit =
        this.userService.currentUser.id == this.blog.user.id || this.isAdmin;
    }
  }

  deteleBlog(event: MouseEvent, blog: Blog) {
    if (confirm('Are you sure you want to delete this blog?')) {
      this.clearState();
      this.blogService.deteleBlog(blog);
      this.router.navigateByUrl('blogs/all');
    }
  }

  editBlog(event: MouseEvent, blog: Blog) {
    this.editState = true;
    this.blogToEdit = blog;
  }

  updateBlog(blog: Blog) {
    if (blog.imgUrl == '' || blog.title == '' || blog.content == '') {
      this.addAlert('Error', 'All fields are required!', 'danger');
    } else {
      this.blogService.updateBlog(blog);
      this.clearState();
      this.addAlert('Success', 'Blog updated succesfully!', 'success');
    }
  }

  likeBlog(blog: Blog) {
    let userId = this.userService.currentUser.id;
    if (!this.blog.likes?.includes(userId!)) {
      blog.likes?.push(userId!);
      this.updateBlog(blog);
      this.addAlert('Success', 'Comment liked succesfully!', 'success');
    } else {
      this.addAlert(
        'Error',
        'You cannot like the blog more than once!',
        'danger'
      );
    }
  }

  enableCommenting() {
    this.commentingState = true;
  }

  postComment(blog: Blog) {
    if (this.commentToAdd != '') {
      this.blogService.addComment(blog, this.commentToAdd);
      this.addAlert('Success', 'Comment added succesfully!', 'success');
      this.commentToAdd = '';
    } else {
      this.addAlert('Error', 'Comment cannot be empty!', 'danger');
    }
    this.clearState();
  }

  copyToClipboard() {
    this.isClicked = true;
    navigator.clipboard.writeText(window.location.href);
  }

  clearState() {
    this.editState = false;
    this.commentingState = false;
    this.error = {};
  }

  addAlert(heading: string, message: string, alertClass: string) {
    this.error = {
      title: heading,
      message: message,
      class: alertClass,
    };
    interval(3000).subscribe(() => {
      this.error = {};
    });
  }
}