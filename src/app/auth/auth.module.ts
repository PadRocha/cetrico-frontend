import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';

import { SignInComponent } from './pages/sign-in/sign-in.component';
import { LogInComponent } from './pages/log-in/log-in.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';



@NgModule({
  declarations: [SignInComponent, LogInComponent, ForgotPasswordComponent,],
  imports: [
    CommonModule,
    AuthRoutingModule,
  ]
})
export class AuthModule { }
