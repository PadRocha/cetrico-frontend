import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './guards/login.guard';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { LogInComponent } from './pages/log-in/log-in.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'signin', component: SignInComponent, canActivate: [LoginGuard] },
      { path: 'login', component: LogInComponent, canActivate: [LoginGuard] },
      { path: 'forgot', component: ForgotPasswordComponent, canActivate: [LoginGuard] },
      { path: '**', redirectTo: 'login' }
    ]
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ]
})
export class AuthRoutingModule { }
