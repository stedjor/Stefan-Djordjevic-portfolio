import { Component, OnInit } from '@angular/core';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import {
  faStepForward,
  faVolumeUp,
  faVolumeMute,
} from '@fortawesome/free-solid-svg-icons';

declare const $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less'],
})
export class HomeComponent implements OnInit {
  faGithub = faGithub;
  faStepForward = faStepForward;
  constructor() {}

  ngOnInit() {}
}
