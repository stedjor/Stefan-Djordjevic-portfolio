import { CanDeactivateGuard } from './_can-deactivate/can-deactivate.guard';
// Angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
// Components
import { AppComponent } from './app.component';
import { ModalsComponent } from './modals/modals.component';
import { ApplicationsComponent } from './applications/applications.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { FourSquareComponent } from './applications/four-square/four-square.component';
import { HereMapComponent } from './applications/four-square/here-map/here-map.component';
import { VenueComponent } from './applications/four-square/venue/venue.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './user/profile/profile.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { ForgotPasswordComponent } from './user/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './user/verify-email/verify-email.component';
import { UsedCarsComponent } from './applications/used-cars/used-cars.component';
import { CarAdsComponent } from './applications/used-cars/car-ads/car-ads.component';
import { CreateAdComponent } from './applications/used-cars/create-ad/create-ad.component';
import { EditAdComponent } from './applications/used-cars/edit-ad/edit-ad.component';
import { CarDetailsComponent } from './applications/used-cars/car-ads/car-details/car-details.component';
import { CarsHeaderComponent } from './applications/used-cars/cars-header/cars-header.component';
// Other
import { OrderModule } from 'ngx-order-pipe';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
// Firebase
import { AngularFireModule } from '@angular/fire';
import {
  AngularFirestoreModule,
  FirestoreSettingsToken,
} from '@angular/fire/firestore';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from '../environments/environment';
// Services
import { SecureGuard } from './_services/auth/guard/secure.guard';
import { AuthGuard } from './_services/auth/guard/auth.guard';
import { CarsInfoService } from './_services/cars/cars-info.service';
import { AdsService } from './_services/cars/ads.service';
import { AuthService } from './_services/auth/auth.service';
import { FsServicesService } from './_services/fs/fs-services.service';
import { ErrorComponent } from './error/error.component';

@NgModule({
  declarations: [
    AppComponent,
    ModalsComponent,
    ApplicationsComponent,
    ContactComponent,
    AboutComponent,
    FourSquareComponent,
    HereMapComponent,
    VenueComponent,
    HomeComponent,
    ProfileComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
    UsedCarsComponent,
    CarAdsComponent,
    CreateAdComponent,
    EditAdComponent,
    CarDetailsComponent,
    CarsHeaderComponent,
    ErrorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    OrderModule,
    FontAwesomeModule,
    // Firebase
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
  ],
  providers: [
    { provide: FirestoreSettingsToken, useValue: {} },
    AuthService,
    AuthGuard,
    SecureGuard,
    AdsService,
    CarsInfoService,
    FsServicesService,
    CanDeactivateGuard
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
