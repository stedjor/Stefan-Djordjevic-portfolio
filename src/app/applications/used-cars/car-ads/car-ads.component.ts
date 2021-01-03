import { Router } from '@angular/router';
import { CarsInfoService } from './../../../_services/cars/cars-info.service';
import { AdsService } from './../../../_services/cars/ads.service';
import { FormGroup } from '@angular/forms';
import { Cars } from './../../../_services/cars/cars';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import {
  faArrowsAltV,
  faSortAmountUpAlt,
  faSortAmountDown,
  faArrowLeft,
  faArrowUp,
  faTimes,
  faCaretDown,
  faSave,
  faCar,
  faArrowAltCircleLeft,
  faArrowAltCircleUp,
} from '@fortawesome/free-solid-svg-icons';
import {
  faArrowAltCircleRight,
  faArrowAltCircleDown,
} from '@fortawesome/free-regular-svg-icons';

declare var $: any;

@Component({
  selector: 'app-car-ads',
  templateUrl: './car-ads.component.html',
  styleUrls: ['./car-ads.component.less'],
})
export class CarAdsComponent implements OnInit {
  defaultPhoto = './assets/no-car.png';
  usedCars: Observable<Cars[]>;
  usedCarsList = [];
  usedYourCars = [];
  usedAllCars = [];
  autorId: string;
  carsInfo = this.ci.carsInfo;
  showDetails = false;
  carId: string;
  selectedBrand: any;
  selectedModel: string[];
  newYears: number[];
  filterForm: FormGroup;
  filters: string[];
  filteredCars = [];
  fAge: any;
  tAge: any;
  fPrice: any;
  tPrice: any;
  selectedOpt = 'Sort By...';
  sortArrow = true;
  isCollapsedYourAds = false;
  isCollapsedAllAds = false;
  isCollapsedFilteredAds = false;
  moreLessYour = false;
  moreLessAll = false;
  moreLessFilter = false;
  customBrand = false;
  // Font Awesome
  faLongArrowAltUp = faSortAmountUpAlt;
  faLongArrowAltDown = faSortAmountDown;
  faArrowDetails = faArrowLeft;
  faArrow = faArrowsAltV;
  faTimes = faTimes;
  faCaretDown = faCaretDown;
  faSave = faSave;
  faCar = faCar;
  faArrowCircle = faArrowAltCircleRight;
  faArrowAltCircleDown = faArrowAltCircleDown;
  faArrowAltCircleUp = faArrowAltCircleUp;

  constructor(
    private adsService: AdsService,
    private ci: CarsInfoService,
    private route: Router
  ) {}

  ngOnInit() {
    this.showDetails = false;
    this.filters = [];
    this.usedCars = this.adsService.getCars();
    this.filterForm = this.adsService.createFilteredForm();
    this.showCars();
    this.width425();
    const user = JSON.parse(localStorage.getItem('user'));
    if (user !== null) {
      this.autorId = user.uid;
    }
    this.sortArrow = false;
  }

  width425() {
    if ($(window).width() <= 425) {
      this.faArrowDetails = faArrowUp;
      this.faArrowCircle = faArrowAltCircleDown;
    }
  }

  colapseList(pieceOfId: string) {
    $(`#collapse${pieceOfId}`).slideToggle(500);
  }

  showCars() {
    this.usedCars.subscribe((data) => {
      this.usedYourCars = [];
      this.usedAllCars = [];
      data.map((car) => {
        this.usedCarsList.push(car);
        car.autorId === this.autorId
          ? this.usedYourCars.push(car)
          : this.usedAllCars.push(car);
      });
    });
  }

  onClick(id: string) {
    this.carId === id
      ? (this.showDetails = !this.showDetails)
      : (this.showDetails = true);
    if (this.showDetails) {
      this.carId = id;
      this.adsService.getCarData(id);
    }
  }

  openFilterModal() {
    this.filters = [];
    this.filterForm.reset();
    $('#filter-modal').fadeIn(() => {
      $('.modal').animate({
        opacity: 1,
      });
    });
  }

  closeFilterModal() {
    $('#filter-modal').fadeOut();
  }

  resetFilters() {
    this.filterForm.reset();
    this.filters = [];
    this.showDetails = false;
  }

  clickOnBackdrop() {
    $('.modal').fadeOut();
  }

  showCustomBrand() {
    this.customBrand = !this.customBrand;
    if ($(window).width() <= 425) {
      if (this.faArrowCircle === faArrowAltCircleDown) {
        this.faArrowCircle = faArrowAltCircleUp;
      } else {
        this.faArrowCircle = faArrowAltCircleDown;
      }
    } else {
      if (this.faArrowCircle === faArrowAltCircleRight) {
        this.faArrowCircle = faArrowAltCircleLeft;
      } else {
        this.faArrowCircle = faArrowAltCircleRight;
      }
    }
  }

  searchModel(key: string) {
    this.selectedBrand = this.carsInfo.brands.filter((f) => {
      return f.name === key;
    });
    this.selectedBrand.map((m) => (this.selectedModel = m.models));
  }

  chooseAge(key: string) {
    const date = new Date();
    const startDate = parseInt(key, 10);
    this.newYears = [];
    for (let i = startDate; i <= date.getFullYear(); i++) {
      this.newYears.push(i);
    }
    this.newYears.sort((a, b) => b - a);
  }

  submitFilters() {
    this.createFilters();
    this.filteringCars();
    this.closeFilterModal();
    this.route.navigate(['/applications/used-cars']);
    this.showDetails = false;
  }

  createFilters() {
    const fForm = this.filterForm.value;
    this.fAge = '';
    this.tAge = '';
    this.fPrice = '';
    this.tPrice = '';
    let fBrand = '';
    let fModel = '';
    let fTown = '';
    let strAge = ``;
    let strPrice = ``;
    for (const key in fForm) {
      if (key === 'brand' && fForm[key] !== null) {
        // fBrand = fForm[key].toLowerCase();
        // fBrand = fBrand[0].toUpperCase() + fBrand.slice(1);
        fBrand = fForm[key];
      }
      if (key === 'model' && fForm[key] !== null) {
        // fModel = fForm[key].toLowerCase();
        // fModel = fModel[0].toUpperCase() + fModel.slice(1);
        fModel = fForm[key];
      }
      if (key === 'town' && fForm[key] !== null) {
        // fTown = fForm[key].toLowerCase();
        // fTown = fTown[0].toUpperCase() + fTown.slice(1);
        fTown = fForm[key];
      }
      if (key === 'fromAge') {
        this.fAge = fForm[key];
      }
      if (key === 'toAge') {
        this.tAge = fForm[key];
      }
      if (key === 'fromPrice') {
        this.fPrice = fForm[key];
      }
      if (key === 'toPrice') {
        this.tPrice = fForm[key];
      }

      strAge = `${this.fAge}-${this.tAge} years`;
      strPrice = `${this.fPrice}-${this.tPrice} €`;

      if (
        fForm[key] !== '' &&
        fForm[key] !== null &&
        key !== 'fromAge' &&
        key !== 'fromPrice' &&
        !this.filters.includes(fForm[key])
      ) {
        if (key === 'fromAge' || key === 'toAge') {
          fForm[key] = strAge;
        }
        if (key === 'fromPrice' || key === 'toPrice') {
          fForm[key] = strPrice;
        }
        if (key === 'brand') {
          fForm[key] = fBrand;
        }
        if (key === 'model') {
          fForm[key] = fModel;
        }
        if (key === 'town') {
          fForm[key] = fTown;
        }
        this.filters.push(fForm[key]);
      }
    }
  }

  filteringCars() {
    this.filteredCars = this.usedCarsList.filter((item) => {
      const cars = Object.values(item.car);
      const sallers = Object.values(item.saller);
      return this.filters.every((f) => {
        if (f.includes('years')) {
          for (let i = this.fAge; i <= this.tAge; i++) {
            if (i == item.car.age) {
              return (f = i);
            }
          }
        }
        if (f.includes('€')) {
          let maxPrice;
          let minPrice;
          if (this.fPrice > this.tPrice) {
            maxPrice = this.fPrice;
            minPrice = this.tPrice;
          } else if (this.tPrice > this.fPrice) {
            maxPrice = this.tPrice;
            minPrice = this.fPrice;
          } else {
            maxPrice = this.tPrice;
            minPrice = this.fPrice;
          }
          for (let j = minPrice; j <= maxPrice; j++) {
            if (j === item.car.price) {
              return (f = j);
            }
          }
        }
        return cars.includes(f) || sallers.includes(f) ? true : false;
      });
    });
  }

  clearFilters() {
    this.filters = [];
  }

  deleteFilter(index) {
    this.filters.splice(index, 1);
    this.filteringCars();
  }

  chooseSort(key: string) {
    this.sortingCars(this.usedYourCars, key, 'desc');
    this.sortingCars(this.usedAllCars, key, 'desc');
    if (this.filteredCars !== []) {
      this.sortingCars(this.filteredCars, key, 'desc');
    }
    this.faArrow = this.faLongArrowAltDown;
    this.sortArrow = false;
  }

  sortCars() {
    if (this.faArrow === this.faLongArrowAltDown && this.sortArrow === false) {
      this.sortingCars(this.usedYourCars, this.selectedOpt, 'asc');
      this.sortingCars(this.usedAllCars, this.selectedOpt, 'asc');
      this.sortingCars(this.filteredCars, this.selectedOpt, 'asc');
      this.faArrow = this.faLongArrowAltUp;
      this.sortArrow = true;
    } else {
      this.sortingCars(this.usedYourCars, this.selectedOpt, 'desc');
      this.sortingCars(this.usedAllCars, this.selectedOpt, 'desc');
      this.sortingCars(this.filteredCars, this.selectedOpt, 'desc');
      this.faArrow = this.faLongArrowAltDown;
      this.sortArrow = false;
    }
  }

  sortingCars(list, prop, order) {
    return list.sort((a, b) => {
      const x = a.car[prop];
      const y = b.car[prop];
      if (order === 'desc') {
        return x > y ? -1 : x < y ? 1 : 0;
      } else {
        return x < y ? -1 : x > y ? 1 : 0;
      }
    });
  }

  showMoreLess(el: string) {
    if (el === 'your') {
      this.moreLessYour = !this.moreLessYour;
      this.moreLessButton(
        el,
        this.usedYourCars,
        this.moreLessYour,
        '500px',
        '135px',
        '400px'
      );
    } else if (el === 'all') {
      this.moreLessAll = !this.moreLessAll;
      this.moreLessButton(
        el,
        this.usedAllCars,
        this.moreLessAll,
        '500px',
        '135px',
        '400px'
      );
    } else if (el === 'filtered') {
      this.moreLessFilter = !this.moreLessFilter;
      this.moreLessButton(
        el,
        this.filteredCars,
        this.moreLessFilter,
        '500px',
        '280px',
        '400px'
      );
    }
  }

  moreLessButton(
    el: string,
    arr: string | any[],
    moreless: boolean,
    mxHeight: string,
    minHeight: string,
    heighT: string
  ) {
    if (arr.length >= 7) {
      if (moreless) {
        $(`.list-scrollbar-${el}`).animate(
          {
            maxHeight: `${mxHeight}`,
            height: `${heighT}`,
          },
          1000
        );
      } else {
        $(`.list-scrollbar-${el}`).animate(
          {
            maxHeight: `${minHeight}`,
            height: 'auto',
          },
          1000
        );
      }
    }
  }
}
