import { Router } from '@angular/router';
import { AuthService } from './../../../_services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { faCar, faCarSide, faTools, faBars } from '@fortawesome/free-solid-svg-icons';

declare const $: any;

@Component({
  selector: 'app-cars-header',
  templateUrl: './cars-header.component.html',
  styleUrls: ['./cars-header.component.less']
})
export class CarsHeaderComponent implements OnInit {
  faCar = faCar;
  faCarSide = faCarSide;
  faTools = faTools;
  faBars = faBars;

  constructor(public authService: AuthService) { }

  ngOnInit() {
  }

  dropdownShowHide() {
    $('#navbarContent').slideToggle(500);
  }
}
