import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Blog } from 'src/app/core/models/blog/blog';
import { BlogService } from 'src/app/core/services/blog/blog.service';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css'],
})
export class TagsComponent implements OnInit {
  blogs!: Blog[];
  tag!: string;
  tags!: string[];

  constructor(
    private blogService: BlogService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((routeParams) => {
      this.tag = Object.values(routeParams)[0];
      this.blogService.getAllBlogs().subscribe((blogs) => {
        this.blogs = blogs.filter((x) => x.tags?.includes(this.tag));
      });
    });

    this.tags = this.blogService.getAllTags();
  }

  backToAll() {
    this.router.navigateByUrl('blogs/all');
  }
}