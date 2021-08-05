import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { NotFoundComponent } from '../shared/not-found/not-found.component';
import { BlogArticleComponent } from './blog-article/blog-article.component';
import { CreateBlogComponent } from "./create-blog/create-blog.component"
import { TagsComponent } from "./tags/tags.component"
import { BlogsComponent } from './blogs/blogs.component';

const routes: Routes = [
  {
    path: 'blogs',
    canActivateChild: [AuthGuard],
    children: [
      {
        path: 'all',
        component: BlogsComponent,
      },
      {
        path: 'blog/:id',
        component: BlogArticleComponent,
      },
      {
        path: 'byTag/:tag',
        component: TagsComponent,
      },
      {
        path: 'new',
        component: CreateBlogComponent,
        data: { isLogged: true },
      },
      { path: '**', pathMatch: 'full', redirectTo: '404-not-found' },
      {
        path: '404-not-found',
        pathMatch: 'full',
        component: NotFoundComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BlogsRoutingModule {}