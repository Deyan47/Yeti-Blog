import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule } from "@angular/forms";

import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './components/shared/shared.module';
import { HomeComponent } from './components/home/home.component';

import { AngularFireModule } from 'angularfire2';
//import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
//import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireStorageModule } from 'angularfire2/storage'
//import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
//import { AngularFirestore } from '@angular/fire/firestore';

import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from 'angularfire2/firestore';

//import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFireAuthModule } from 'angularfire2/auth';

import { CKEditorModule } from 'ng2-ckeditor';

import { environment } from '../environments/environment';
import { AuthGuard } from './core/guards/auth.guard';

import { AuthRoutingModule } from './components/auth/auth-routing.module';
import { BlogsRoutingModule } from './components/blogs/blogs-routing.module';

import { BlogService } from './core/services/blog/blog.service';
import { UserServiceService } from './core/services/user/user-service.service';
import { ImgService } from './core/services/img/img.service';

import { BlogsComponent } from './components/blogs/blogs/blogs.component';
import { BlogItemComponent } from './components/blogs/blog-item/blog-item.component';
import { BlogArticleComponent } from './components/blogs/blog-article/blog-article.component';
import { CreateBlogComponent } from './components/blogs/create-blog/create-blog.component';
import { TagsComponent } from './components/blogs/tags/tags.component';
import { UserProfileComponent } from './components/user/user-profile/user-profile.component';
import { LeaderboardComponent } from './components/user/leaderboard/leaderboard.component';

import { AdminBlogsComponent } from './components/admin/admin-blogs/admin-blogs.component';
import { AdminUsersComponent } from './components/admin/admin-users/admin-users.component';
import { AdminRoutingModule } from "./components/admin/admin-routing.module";
import { ShareModule } from "ngx-sharebuttons";
import { AdminModule } from "./components/admin/admin.module";


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BlogsComponent,
    BlogItemComponent,
    BlogArticleComponent,
    CreateBlogComponent,
    TagsComponent,
    UserProfileComponent,
    LeaderboardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthRoutingModule,
    AdminRoutingModule,
    BlogsRoutingModule,
    SharedModule,
    AdminModule,
    BrowserAnimationsModule,
    CKEditorModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase, 'yeti-blog'),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    ShareModule,
  ],
  providers: [
    BlogService,
    AuthGuard,
    UserServiceService,
    ImgService,
    AngularFireAuthModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}