import { Component, OnInit } from '@angular/core';
import {
  faCircle,
  faCaretUp,
  faPlay
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.less']
})
export class AboutComponent implements OnInit {
  faCircle = faCircle;
  faCaretUp = faCaretUp;
  faPlay = faPlay;

  constructor() { }

  ngOnInit() {
  }

}
