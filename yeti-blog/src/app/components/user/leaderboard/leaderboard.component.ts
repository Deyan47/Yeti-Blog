import { Component, OnInit } from '@angular/core';
import { Blog } from 'src/app/core/models/blog/blog';
import { User } from 'src/app/core/models/user/user';
import { BlogService } from 'src/app/core/services/blog/blog.service';
import { UserServiceService } from 'src/app/core/services/user/user-service.service';
import { UserBlogs } from '../../../core/models/user/userBlogs';
@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css'],
})
export class LeaderboardComponent implements OnInit {
  blogs!: Blog[];
  users!: User[];
  userBlogList!: Array<UserBlogs>;
  isLogged: boolean = false;

  constructor(
    private userService: UserServiceService,
    private blogService: BlogService
  ) {
    this.userBlogList = [];
    this.isLogged = this.userService.isLogged;
  }

  ngOnInit(): void {
    this.blogService.getAllBlogs().subscribe((blogs) => {
      this.blogs = blogs;
    });

    this.userService.getAllUsers().subscribe((users) => {
      users.forEach((user) => {
        this.userBlogList.push({
          user: user,
          blogs: this.getBlogsByUserId(user.id!),
        });
        this.userBlogList = this.userBlogList.sort((a, b) => b.blogs - a.blogs);
      });
    });
  }

  getBlogsByUserId(userId: string) {
    return this.blogs.filter((x) => x.user.id === userId).length;
  }
}