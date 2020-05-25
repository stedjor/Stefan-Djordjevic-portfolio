import { AppCard } from './app-cards.model';
import { Component, OnInit } from '@angular/core';

declare const $: any;

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.less']
})
export class ApplicationsComponent implements OnInit {
  appCards: AppCard[] = [
    new AppCard('FourSquare', 'four-square', './assets/fs-icons/fs-here-img.png'),
    new AppCard('UsedCars', 'used-cars', './assets/UsedCars-brand.png'),
    // new AppCard('app3', 'applications', ''),
  ];

  constructor() {}

  ngOnInit() {
  }
}
