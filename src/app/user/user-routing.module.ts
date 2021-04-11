import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContainerComponent } from './container/container.component';
import { BookmarkedComponent } from './pages/bookmarked/bookmarked.component';
import { PostCreatedComponent } from './pages/post-created/post-created.component';
import { RecentCommentsComponent } from './pages/recent-comments/recent-comments.component';
import { RecentlyBookmarkedComponent } from './pages/recently-bookmarked/recently-bookmarked.component';
import { SettingsComponent } from './pages/settings/settings.component';

const routes: Routes = [{
  path: '',
  component: ContainerComponent,
  children: [{
    path: '',
    pathMatch: 'full',
    redirectTo: '/blog/home',
  }, {
    path: 'bookmarkeds',
    component: BookmarkedComponent,
  }, {
    path: 'settings',
    component: SettingsComponent,
  }, {
    path: 'recently-bookmarked/:user',
    component: RecentlyBookmarkedComponent,
  }, {
    path: 'recent-comments/:user',
    component: RecentCommentsComponent,
  }, {
    path: ':user',
    component: PostCreatedComponent,
  }],
}, {
  path: ':user',
  redirectTo: '/user/:user'
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
