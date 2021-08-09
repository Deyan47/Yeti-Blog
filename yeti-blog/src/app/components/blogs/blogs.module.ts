import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogsRoutingModule } from './blogs-routing.module';
import { BlogArticleComponent } from './blog-article/blog-article.component';
import { BlogItemComponent } from './blog-item/blog-item.component';
import { BlogsComponent } from './blogs/blogs.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { CKEditorModule } from 'ng2-ckeditor';
import { TagsComponent } from './tags/tags.component';
import { CreateBlogComponent } from './create-blog/create-blog.component';

@NgModule({
  declarations: [
    BlogArticleComponent,
    BlogItemComponent,
    CreateBlogComponent,
    BlogsComponent,
    TagsComponent,
  ],
  imports: [
    CommonModule,
    BlogsRoutingModule,
    SharedModule,
    FormsModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    CKEditorModule,
    BlogsRoutingModule,
  ],
  exports: [BlogItemComponent],
})
export class BlogsModule {}