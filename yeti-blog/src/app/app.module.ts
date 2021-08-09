import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule } from "@angular/forms";
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage'
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { environment } from '../environments/environment';

import { AuthGuard } from './core/guards/auth.guard';

import { AppRoutingModule } from './app-routing.module';
import { AuthRoutingModule } from './components/auth/auth-routing.module';
import { BlogsRoutingModule } from './components/blogs/blogs-routing.module';
import { AdminRoutingModule } from "./components/admin/admin-routing.module";

import { AuthModule } from './components/auth/auth.module';
import { AdminModule } from './components/admin/admin.module';
import { BlogsModule } from './components/blogs/blogs.module';
import { SharedModule } from './components/shared/shared.module';

import { BlogService } from './core/services/blog/blog.service';
import { UserServiceService } from './core/services/user/user-service.service';
import { ImgService } from './core/services/img/img.service';
import { ChatService } from './core/services/chat/chat.service';

import { AppComponent } from './app.component';
import { UserProfileComponent } from './components/user/user-profile/user-profile.component';
import { LeaderboardComponent } from './components/user/leaderboard/leaderboard.component';
import { ChatComponent } from './components/chat/chat.component';
import { HomeComponent } from './components/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserProfileComponent,
    LeaderboardComponent,
    ChatComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatProgressSpinnerModule,
    FormsModule,
    AppRoutingModule,
    AuthRoutingModule,
    AdminRoutingModule,
    BlogsRoutingModule,
    SharedModule,
    AdminModule,
    AuthModule,
    BlogsModule,
    AngularFireModule.initializeApp(environment.firebase, 'yeti-blog'),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
  ],
  providers: [
    BlogService,
    AuthGuard,
    UserServiceService,
    ImgService,
    ChatService,
    AngularFireAuthModule,
    AngularFirestore,
    AngularFireStorageModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}