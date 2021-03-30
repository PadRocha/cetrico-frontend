import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { FavoritesComponent } from './pages/favorites/favorites.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { ContainerComponent } from './container/container.component';
import { ProfileComponent } from './pages/profile/profile.component';


@NgModule({
  declarations: [
    FavoritesComponent,
    SettingsComponent,
    ContainerComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule
  ]
})
export class UserModule { }
