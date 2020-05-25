import { Component, OnInit } from '@angular/core';
import {
  faPowerOff,
  faChevronLeft,
  faChevronRight
} from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { Meta } from '@angular/platform-browser';

declare const $: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  featureSelect = 'blank';
  turnOnOff = false;
  selectModal: string;
  modalMenuOpened = false;
  modalInfoOpened = false;
  infoModalUrl: string;
  showHideMenu = false;
  // font awesome icons
  faPowerOff = faPowerOff;
  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;

  routLink = [
    { text: 'Home', rLink: '/home' },
    { text: 'About', rLink: '/about' },
    { text: 'Aplications', rLink: '/applications' },
    { text: 'FourSquare', rLink: '/applications/four-square' },
    { text: 'UsedCars', rLink: '/applications/used-cars/car-ads' },
    { text: 'Contact', rLink: '/contact' }
  ];

  metaTags = [
    { name: 'keywords', content: `Angular, Firebase, Firestore, FourSquare, HERE WeGo, UsedCar, web, presentation, Frontend, Front-end, developer, programer, prezentacija, projekat, Stefan, Djordjevic, Đorđević` },
    { name: 'description', content: 'Web presentation by Stefan Djordjevic' }
  ]

  constructor(public router: Router, private metaTag: Meta) { }

  ngOnInit() {
    this.metaTag.addTags(this.metaTags);
  }

  buttonTurn(feature: string) {
    if ($('#btn-turn').hasClass('btn-red') && !this.turnOnOff) {
      $('#btn-turn').removeClass('btn-red');
      $('#btn-turn').addClass('btn-green');
      this.turnOnEffect();
      setTimeout(() => {
        this.featureSelect = feature;
      }, 400);
    } else {
      $('#btn-turn').removeClass('btn-green');
      $('#btn-turn').addClass('btn-red');
      this.featureSelect = 'blank';
      this.turnOffEffect();
    }
  }

  turnOnEffect() {
    $('#screen').animate({
      width: '100%',
      left: '0',
      right: '0',
    }, 'fast').animate({
      height: '100%',
      top: '0',
      bottom: '0',
    }, 'fast');

    this.turnOnOff = true;
    this.showHideMenu = true;
  }

  turnOffEffect() {
    $('#screen').animate({
      height: '2px',
      top: '50%',
      bottom: '50%',
      'z-index': '1000'
    }, 'fast').animate({
      width: '0',
      left: '50%',
      right: '50%',
    }, 'fast');

    this.turnOnOff = false;
    this.showHideMenu = false;
  }

  buttonPrevious() {
    const findObj = this.routLink.find(f => f.rLink === this.router.url);
    let indxObj = this.routLink.indexOf(findObj);
    if (indxObj === -1) {
      indxObj = 4;
    }
    indxObj--;
    if (indxObj < 0) {
      indxObj = this.routLink.length - 1;
    }
    const link = this.routLink[indxObj].rLink;
    this.closeModal();
    return this.router.navigate([link]);
  }

  buttonNext() {
    const findObj = this.routLink.find(f => f.rLink === this.router.url);
    let indxObj = this.routLink.indexOf(findObj);
    if (indxObj === -1) {
      indxObj = 4;
    }
    indxObj++;
    if (indxObj > this.routLink.length - 1) {
      indxObj = 0;
    }
    const link = this.routLink[indxObj].rLink;
    this.closeModal();
    return this.router.navigate([link]);
  }

  showMenu() {
    this.selectModal = 'modal-menu';
    this.modalMenuOpened = !this.modalMenuOpened;
    setTimeout(() => {
      if (this.modalMenuOpened) {
        $(`#modal-menu`).fadeIn(() => {
          this.modalAnimate();
        });
        this.modalInfoOpened = false;
      } else {
        $(`#modal-menu`).fadeOut(() => {
          this.modalAnimate();
        });
      }
    }, 1);
  }

  showInfo() {
    this.selectModal = 'modal-info';
    this.checkInfoIfCar();
    setTimeout(() => {
      if (!this.modalInfoOpened) {
        $(`#modal-info`).fadeIn(() => {
          this.modalAnimate();
        });
        this.modalInfoOpened = !this.modalInfoOpened;
        this.modalMenuOpened = false;
      } else {
        $(`#modal-info`).fadeOut(() => {
          this.modalInfoOpened = !this.modalInfoOpened;
          this.modalAnimate();
        });
      }
    }, 1);
  }

  checkInfoIfCar() {
    this.infoModalUrl = this.router.url;
    if (this.infoModalUrl.includes('car-ads')) {
      this.infoModalUrl = 'car-ads';
    } else if (this.infoModalUrl.includes('create-ad')) {
      this.infoModalUrl = 'create-ad';
    } else if (this.infoModalUrl.includes('edit-ad')) {
      this.infoModalUrl = 'edit-ad';
    }
  }

  closeModal() {
    $(`.modal`).fadeOut(() => {
      this.modalAnimate();
    });
    this.modalMenuOpened = false;
    this.modalInfoOpened = false;
  }

  closeModalOnClick(obj: any) {
    if (!status) {
      this.modalMenuOpened = obj.status;
      this.modalInfoOpened = obj.status;
      $(`#${obj.modal}`).fadeOut(() => {
        this.modalAnimate();
      });
    }
  }

  clickOnBackdrop() {
    this.modalMenuOpened = false;
    this.modalInfoOpened = false;
    $(`#${this.selectModal}`).fadeOut();
  }

  modalAnimate() {
    $('.modal').animate({
      opacity: 1
    }, 'slow');
  }
}
