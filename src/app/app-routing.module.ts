import { ErrorComponent } from './error/error.component';
import { CanDeactivateGuard } from './_can-deactivate/can-deactivate.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// Guards
import { AuthGuard } from './_services/auth/guard/auth.guard';
import { SecureGuard } from './_services/auth/guard/secure.guard';
// Components
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ApplicationsComponent } from './applications/applications.component';
import { ContactComponent } from './contact/contact.component';
import { FourSquareComponent } from './applications/four-square/four-square.component';
// :Used Cars
import { UsedCarsComponent } from './applications/used-cars/used-cars.component';
import { CarAdsComponent } from './applications/used-cars/car-ads/car-ads.component';
import { CarDetailsComponent } from './applications/used-cars/car-ads/car-details/car-details.component';
import { CreateAdComponent } from './applications/used-cars/create-ad/create-ad.component';
import { EditAdComponent } from './applications/used-cars/edit-ad/edit-ad.component';
// :User
import { ProfileComponent } from './user/profile/profile.component';
import { RegisterComponent } from './user/register/register.component';
import { LoginComponent } from './user/login/login.component';
import { VerifyEmailComponent } from './user/verify-email/verify-email.component';
import { ForgotPasswordComponent } from './user/forgot-password/forgot-password.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [SecureGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [SecureGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard], canDeactivate: [CanDeactivateGuard] },
  { path: 'forgot-password', component: ForgotPasswordComponent, canActivate: [SecureGuard] },
  { path: 'verify-email', component: VerifyEmailComponent, canActivate: [SecureGuard] },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  {
    path: 'applications',
    children: [
      { path: '', component: ApplicationsComponent },
      { path: 'four-square', component: FourSquareComponent },
      {
        path: 'used-cars', component: UsedCarsComponent, canActivate: [AuthGuard],
        children: [
          { path: '', redirectTo: 'car-ads', pathMatch: 'full' },
          {
            path: 'car-ads', component: CarAdsComponent,
            children: [
              { path: ':id', component: CarDetailsComponent},
            ]
          },
          { path: 'create-ad', component: CreateAdComponent, canDeactivate: [CanDeactivateGuard] },
          { path: 'edit-ad/:id', component: EditAdComponent, canDeactivate: [CanDeactivateGuard] },
        ]
      },
    ]
  },
  { path: 'contact', component: ContactComponent },
  { path: '**', component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
