import { Router } from '@angular/router';
import { AuthService } from './../_services/auth/auth.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {
  faUser,
  faSignOutAlt,
  faSignInAlt,
  faHome,
  faAddressCard,
  faLaptopCode,
  faComments,
  faCar,
  faUserEdit,
  faTimes,
  faCheck,
  faCamera,
  faUndoAlt,
  faEdit,
  faTrashAlt
} from '@fortawesome/free-solid-svg-icons';
import {
  faFoursquare,
  faGoogle,
  faFacebookF,
  faLinkedinIn
} from '@fortawesome/free-brands-svg-icons';
import {
  faLightbulb
} from '@fortawesome/free-regular-svg-icons';

declare const $: any;

@Component({
  selector: 'app-modals',
  templateUrl: './modals.component.html',
  styleUrls: ['./modals.component.less']
})
export class ModalsComponent implements OnInit {
  @Input() modalSelect: string;
  @Output() modalClose = new EventEmitter<any>();
  @Input() modalInfoUrl: string;
  modalInfoUsedCars: string;
  openedModal: boolean;
  defaultProfileIcon
  detailsOfUser: any;
  profilePhoto: string = './assets/deafult-profile-icon.png';
  urlLocation: string;
  // Font Awesome
  faUser = faUser;
  faSignOutAlt = faSignOutAlt;
  faSignInAlt = faSignInAlt;
  faHome = faHome;
  faAddressCard = faAddressCard;
  faLaptopCode = faLaptopCode;
  faComments = faComments;
  faCar = faCar;
  faTimes = faTimes;
  faCheck = faCheck;
  faUserEdit = faUserEdit;
  faCamera = faCamera;
  faFoursquare = faFoursquare;
  faGoogle = faGoogle;
  faFacebookF = faFacebookF;
  faLinkedinIn = faLinkedinIn;
  faEdit = faEdit;
  faTrashAlt = faTrashAlt;
  faUndoAlt = faUndoAlt;
  faLightbulb = faLightbulb;

  constructor(public authService: AuthService, public router: Router) {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user !== null) {
      this.getUser(user.uid);
    }
  }

  ngOnInit() {
    $(document).on('click', (event) => {
      const $trigger = $('.dropdown');
      if ($trigger !== event.target && !$trigger.has(event.target).length) {
        $('.dropdown-menu').slideUp('fast');
      }
    });
    this.urlLocation = location.toString();

  }

  getUser(id: string) {
    this.authService.getUserData(id).subscribe(user => {
      this.detailsOfUser = user;
      (this.detailsOfUser.photoURL !== null) ?
        this.profilePhoto = this.detailsOfUser.photoURL :
        this.profilePhoto = './assets/deafult-profile-icon.png';
    });
  }

  dropdownShowHide() {
    $('.dropdown').find('.dp-menu').slideToggle('fast');
  }

  dropdownHide() {
    $('.dp-menu').hide('fast');
  }

  // Dropdown show or hide when it's responsive
  dpResponsiveShowHide() {
    const x = document.getElementById('navbarSupportedContent');
    if (x.style.display === 'block') {
      x.style.display = 'none';
    } else {
      x.style.display = 'block';
    }
  }

  closeMenu() {
    this.openedModal = false;
    this.modalClose.emit({ status: this.openedModal, modal: 'modal-menu' });
  }

  closeInfo() {
    this.openedModal = false;
    this.modalClose.emit({ status: this.openedModal, modal: 'modal-info' });
  }

  modalAnimate() {
    $('.modal').animate({
      opacity: 1,
      right: 0
    }, 'slow');
  }

  logOut() {
    this.authService.logOut();
  }
}
