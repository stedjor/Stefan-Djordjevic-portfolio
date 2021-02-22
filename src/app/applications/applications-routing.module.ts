import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
// Guards
import { AuthGuard } from '../_services/auth/guard/auth.guard';
import { CanDeactivateGuard } from '../_can-deactivate/can-deactivate.guard';
// Components
import { ApplicationsComponent } from './applications.component';
import { FourSquareComponent } from './four-square/four-square.component';
// :Used Cars
import { UsedCarsComponent } from './used-cars/used-cars.component';
import { CarAdsComponent } from './used-cars/car-ads/car-ads.component';
import { CarDetailsComponent } from './used-cars/car-ads/car-details/car-details.component';
import { CreateAdComponent } from './used-cars/create-ad/create-ad.component';
import { EditAdComponent } from './used-cars/edit-ad/edit-ad.component';

const routes: Routes = [
  { path: '', component: ApplicationsComponent },
  { path: 'four-square', component: FourSquareComponent },
  {
    path: 'used-cars',
    component: UsedCarsComponent,
    children: [
      { path: '', redirectTo: 'car-ads', pathMatch: 'full' },
      {
        path: 'car-ads',
        component: CarAdsComponent,
        children: [{ path: ':id', component: CarDetailsComponent }],
      },
      {
        path: 'create-ad',
        component: CreateAdComponent,
        canActivate: [AuthGuard],
        canDeactivate: [CanDeactivateGuard],
      },
      {
        path: 'edit-ad/:id',
        component: EditAdComponent,
        canActivate: [AuthGuard],
        canDeactivate: [CanDeactivateGuard],
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApplicationsRoutingModule {}
