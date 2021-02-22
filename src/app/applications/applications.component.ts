import { AppCard } from './app-cards.model';
import { Component, OnInit } from '@angular/core';
import {
  faReact,
  faAngular,
  faGithub
} from '@fortawesome/free-brands-svg-icons';
import {
  faLightbulb
} from '@fortawesome/free-regular-svg-icons';
import {
  faExternalLinkAlt
} from '@fortawesome/free-solid-svg-icons';

declare const $: any;

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.less']
})
export class ApplicationsComponent implements OnInit {
  faReact = faReact;
  faAngular = faAngular;
  faGithub = faGithub;
  faLightbulb = faLightbulb;
  faExternalLinkAlt = faExternalLinkAlt;

  appCards: AppCard[] = [
    new AppCard('UsedCars', 'used-cars', './assets/app-images/UsedCars-brand.png'),
    new AppCard('FourSquare', 'four-square', './assets/app-images/fs-here-img.png')
  ];

  constructor() { }

  ngOnInit() {
  }

  openNewTab(path: any) {
    window.open(path, '_blank');
  }
}
