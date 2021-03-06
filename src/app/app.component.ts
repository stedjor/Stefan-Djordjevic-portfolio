import { NavigationEnd } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import {
  faPowerOff,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { ActivatedRoute, Router } from "@angular/router";
import { Meta } from "@angular/platform-browser";
import { filter } from "rxjs/operators";
import { environment } from '../environments/environment';

declare const $: any;
declare const gtag: any;

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.less"],
})
export class AppComponent implements OnInit {
  title = "Stefan Đorđević";
  featureSelect = "blank";
  turnOnOff = false;
  selectModal: string;
  modalMenuOpened = false;
  modalInfoOpened = false;
  infoModalUrl: string;
  showHideMenu = false;
  urlLocation: string;
  tooltipValue: string;
  signature = "Stefan Đorđević";
  counterScreen = 5;
  // font awesome icons
  faPowerOff = faPowerOff;
  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;

  routLink = [
    { text: "Home", rLink: "/home" },
    { text: "About", rLink: "/about" },
    { text: "Applications", rLink: "/applications" },
    { text: "UsedCars", rLink: "/applications/used-cars/car-ads" },
    { text: "FourSquare", rLink: "/applications/four-square" },
    { text: "Contact", rLink: "/contact" },
  ];

  metaTags = [
    {
      name: "keywords",
      content: `Angular, Firebase, Firestore, FourSquare, HERE WeGo, UsedCar, web,
      presentation, Frontend, Front-end, developer, programer, prezentacija, projekat, Stefan, Djordjevic, Đorđević`,
    },
    { name: "description", content: "Web presentation by Stefan Djordjevic" },
  ];

  constructor(
    public router: Router,
    public aRoute: ActivatedRoute,
    private metaTag: Meta
  ) {
    // Google Analytics
    const navEndEvents = router.events.pipe(
      filter((event) => event instanceof NavigationEnd)
    );
    navEndEvents.subscribe((event: NavigationEnd) => {
      gtag("config", environment.gtag, {
        'page_path': event.urlAfterRedirects
      });
    });
  }

  ngOnInit() {
    this.metaTag.addTags(this.metaTags);
    this.urlLocation = location.toString();
    this.signatureResponsive();
    setTimeout(() => {
      this.tooltipValue = $(".turn-on-tooltip").text();
    }, 100);
    this.noScreenAnimation();
  }

  noScreenAnimation() {
    if (this.featureSelect === "blank") {
      setInterval(() => {
        if (this.counterScreen > 0) {
          this.counterScreen--;
          if (this.counterScreen === 0) {
            this.buttonTurnOn("show");
          }
        }
      }, 1000);
    }
  }

  buttonTurn(feature: string) {
    if ($("#btn-turn").hasClass("btn-red") && !this.turnOnOff) {
      this.buttonTurnOn(feature);
    } else {
      this.buttonTurnOff("blank");
    }
  }

  buttonTurnOn(feature: string) {
    $("#btn-turn").removeClass("btn-red");
    $("#btn-turn").addClass("btn-green");
    this.turnOnEffect();
    setTimeout(() => {
      this.featureSelect = feature;
    }, 400);
  }

  buttonTurnOff(feature: string) {
    $("#btn-turn").removeClass("btn-green");
    $("#btn-turn").addClass("btn-red");
    this.turnOffEffect();
    this.featureSelect = feature;
    this.counterScreen = 5;
  }

  turnOnEffect() {
    $("#screen")
      .animate(
        {
          width: "100%",
          left: "0",
          right: "0",
        },
        "fast"
      )
      .animate(
        {
          height: "100%",
          top: "0",
          bottom: "0",
        },
        "fast"
      );

    this.turnOnOff = true;
    this.showHideMenu = true;
  }

  turnOffEffect() {
    $("#screen")
      .animate(
        {
          height: "2px",
          top: "50%",
          bottom: "50%",
          "z-index": "1000",
        },
        "fast"
      )
      .animate(
        {
          width: "0",
          left: "50%",
          right: "50%",
        },
        "fast"
      );

    this.turnOnOff = false;
    this.showHideMenu = false;
  }

  buttonPrevious() {
    const findObj = this.routLink.find((f) => f.rLink === this.router.url);
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
    const findObj = this.routLink.find((f) => f.rLink === this.router.url);
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
    this.selectModal = "modal-menu";
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
    this.selectModal = "modal-info";
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
    if (this.infoModalUrl.includes("car-ads")) {
      this.infoModalUrl = "car-ads";
    } else if (this.infoModalUrl.includes("create-ad")) {
      this.infoModalUrl = "create-ad";
    } else if (this.infoModalUrl.includes("edit-ad")) {
      this.infoModalUrl = "edit-ad";
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
    $(".modal").animate(
      {
        opacity: 1,
      },
      "slow"
    );
  }

  signatureResponsive() {
    if ($(window).width() <= 640) {
      this.signature = "SĐ";
    }
  }
}
