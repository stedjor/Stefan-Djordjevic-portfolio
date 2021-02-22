
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
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
// Other
import { OrderModule } from 'ngx-order-pipe';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
// Firebase
import { AngularFireModule } from '@angular/fire';
import {
  AngularFirestoreModule,
  FirestoreSettingsToken,
} from '@angular/fire/firestore';
import {  AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from '../environments/environment';
// Services
import { CanDeactivateGuard } from './_can-deactivate/can-deactivate.guard';
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
    ContactComponent,
    AboutComponent,
    HomeComponent,
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
    AngularFireStorageModule
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
