import { VenueComponent } from './venue/venue.component';
import { HereMapComponent } from './here-map/here-map.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FsServicesService } from '../../_services/fs/fs-services.service';
import {
  faChevronLeft,
  faChevronRight,
  faChevronUp,
  faChevronDown,
  faSearch
} from '@fortawesome/free-solid-svg-icons';
import { FsKeysService } from 'src/app/_services/fs/fs-keys/fs-keys.service';

declare let $: any;
@Component({
  selector: 'app-four-square',
  templateUrl: './four-square.component.html',
  styleUrls: ['./four-square.component.less']
})
export class FourSquareComponent implements OnInit {
  @ViewChild(HereMapComponent) heroeMap: HereMapComponent;
  @ViewChild(VenueComponent) venueCard: VenueComponent;
  dataItems = [];
  listItems = [];
  location = [];
  venueOptions = ['Coffee', 'Restaurant', 'Shops'];
  cardsShowHide = false;
  searchShowHide = false;
  permissionStatus = '';
  fsAppId = '';
  fsAppCode = '';
  // FontAwesome Icons
  showHideCardsArrow = faChevronLeft;
  showHideSearchArrow = faChevronUp;
  faSearch = faSearch;

  constructor(private fsService: FsServicesService) { }

  showVenues(target: string) {
    if (target !== '' && target !== undefined) {
      this.fsService.getInfomation(target)
        .subscribe((data: any) => {
          try {
            this.listItems = [];
            this.heroeMap.removeVenueMarker();
            this.dataItems = data.response.groups[0].items;
            this.dataItems.forEach(element => {
              if (element.venue.location.distance <= 2000) {
                this.listItems.push(element);
              }
            });
            this.listItems.sort((a, b) => a.venue.location.distance - b.venue.location.distance);
            this.listItems.map(el => this.heroeMap.venueInformation(el));
            this.venueOptions.forEach(() => {
              if (!this.venueOptions.includes(target)) {
                this.venueOptions.push(target);
              }
            });
            $('#venue-wrapper').css('visibility', 'visible');
          } catch (error) {
            console.log(error);
          }
        });
    }
  }

  showLocation() {
    navigator.geolocation.getCurrentPosition((position) => {
      if (!navigator.geolocation) {
        alert('Oops! This browser does not support HTML Geolocation.');
      } else {
        this.showPosition(position);
        this.permissionStatus = 'granted'
      }
    }, (error) => {
      if (error.code == error.PERMISSION_DENIED)
        this.permissionStatus = 'denied';
    })
  }

  showPosition(position: any) {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
    this.location = [{ lat, lng }];
  }

  ngOnInit() {
    try {
      this.showLocation();
    } catch (e) {
      console.log(e);
    }
  }

  clickOnCard($event: any) {
    const element = $event;
    $(`.panel-card`).removeClass('fs-card-active');
    $(`#${element.venue.id}`).addClass('fs-card-active');
    this.heroeMap.selectMarker(element);
  }

  showHideCards() {
    !this.cardsShowHide ? this.cardsShowHide = true : this.cardsShowHide = false;
    $('#venue-scroll').animate({
      width: 'toggle',
    }, 'slow');

    if (this.showHideCardsArrow === faChevronLeft) {
      this.showHideCardsArrow = faChevronRight;
      $('#btn-venue-arrow').css('border-top-left-radius', '5px');
    } else {
      this.showHideCardsArrow = faChevronLeft;
      $('#btn-venue-arrow').css('border-top-left-radius', '0');
    }
  }

  showHideSearch() {
    !this.searchShowHide ? this.searchShowHide = true : this.searchShowHide = false;
    $('#search').animate({
      height: 'toggle'
    }, 'slow');
    if (this.showHideSearchArrow === faChevronUp) {
      this.showHideSearchArrow = faChevronDown;
      $('#btn-search-arrow').animate({
        borderBottomLeftRadius: '5px'
      });
    } else {
      this.showHideSearchArrow = faChevronUp;
      $('#btn-search-arrow').animate({
        borderBottomLeftRadius: '0'
      });
    }
  }
}
