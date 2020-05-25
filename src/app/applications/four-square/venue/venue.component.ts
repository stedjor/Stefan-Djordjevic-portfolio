import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

declare var $: any;
@Component({
  selector: 'app-venue',
  templateUrl: './venue.component.html',
  styleUrls: ['./venue.component.less']
})
export class VenueComponent implements OnInit {
  @Input() public item: any;
  @Output() public venueOutput = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
    $('.panel-card').focusout(() => {
      $(this).removeClass('fs-card-active');
    });
  }

  venueClickOnCard(element: any) {
    this.venueOutput.emit(element);
  }
}
