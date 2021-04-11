import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { SettingsComponent } from './pages/settings/settings.component';
import { ContainerComponent } from './container/container.component';
import { PostCreatedComponent } from './pages/post-created/post-created.component';
import { RecentlyBookmarkedComponent } from './pages/recently-bookmarked/recently-bookmarked.component';
import { RecentCommentsComponent } from './pages/recent-comments/recent-comments.component';
import { BookmarkedComponent } from './pages/bookmarked/bookmarked.component';
import { HeaderComponent } from './components/header/header.component';
import { ProfileInfoComponent } from './components/profile-info/profile-info.component';


@NgModule({
  declarations: [
    SettingsComponent,
    ContainerComponent,
    PostCreatedComponent,
    RecentlyBookmarkedComponent,
    RecentCommentsComponent,
    BookmarkedComponent,
    HeaderComponent,
    ProfileInfoComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule
  ]
})
export class UserModule { }
