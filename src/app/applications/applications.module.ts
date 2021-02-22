import { ApplicationsRoutingModule } from './applications-routing.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgModule } from '@angular/core';
// Components
import { ApplicationsComponent } from './applications.component';
// :UsedCars
import { UsedCarsComponent } from './used-cars/used-cars.component';
import { CarAdsComponent } from './used-cars/car-ads/car-ads.component';
import { CreateAdComponent } from './used-cars/create-ad/create-ad.component';
import { EditAdComponent } from './used-cars/edit-ad/edit-ad.component';
import { CarDetailsComponent } from './used-cars/car-ads/car-details/car-details.component';
import { CarsHeaderComponent } from './used-cars/cars-header/cars-header.component';
// :FourSquare
import { FourSquareComponent } from './four-square/four-square.component';
import { HereMapComponent } from './four-square/here-map/here-map.component';
import { VenueComponent } from './four-square/venue/venue.component';

@NgModule({
  declarations: [
    ApplicationsComponent,
    FourSquareComponent,
    HereMapComponent,
    VenueComponent,
    UsedCarsComponent,
    CarAdsComponent,
    CreateAdComponent,
    EditAdComponent,
    CarDetailsComponent,
    CarsHeaderComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    ApplicationsRoutingModule
  ]
})
export class ApplicationsModule {}
