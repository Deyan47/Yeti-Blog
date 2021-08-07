import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminBlogsComponent } from './components/admin/admin-blogs/admin-blogs.component';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/shared/not-found/not-found.component';
import { LeaderboardComponent } from './components/user/leaderboard/leaderboard.component';
import { UserProfileComponent } from './components/user/user-profile/user-profile.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent },
  { path: 'user/:userId', component: UserProfileComponent },
  { path: 'leaderboard', component: LeaderboardComponent },
  { path: '404-not-found', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}