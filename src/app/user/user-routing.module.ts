import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';

import { AuthGuard } from '../_services/auth/guard/auth.guard';
import { SecureGuard } from '../_services/auth/guard/secure.guard';
import { CanDeactivateGuard } from '../_can-deactivate/can-deactivate.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [SecureGuard] },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [SecureGuard],
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
    canDeactivate: [CanDeactivateGuard],
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
    canActivate: [SecureGuard],
  },
  {
    path: 'verify-email',
    component: VerifyEmailComponent,
    canActivate: [SecureGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
