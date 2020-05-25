import { Router, NavigationEnd, Event } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import { CarsInfoService } from './../../../_services/cars/cars-info.service';
import { AuthService } from './../../../_services/auth/auth.service';
import { AdsService } from './../../../_services/cars/ads.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Cars } from './../../../_services/cars/cars';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import {
  faCaretDown,
  faTools,
  faTimes,
  faArrowAltCircleLeft,
  faArrowAltCircleUp
} from '@fortawesome/free-solid-svg-icons';
import {
  faArrowAltCircleRight,
  faArrowAltCircleDown,
  faImages
} from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-create-ad',
  templateUrl: './create-ad.component.html',
  styleUrls: ['./create-ad.component.less']
})
export class CreateAdComponent implements OnInit {
  usedCars: Observable<Cars[]>;
  carsForm: FormGroup;
  isSaving = false;
  isAddImages = false;
  imagePath: string;
  downloadURL: any;
  imageURL: string;
  imagesArr: string[] = [];
  carsInfo = this.ci.carsInfo;
  selectedBrand: any;
  selectedModel: string[];
  carMark = false;
  customBrand = false;
  carMarkTitle = 'Show mark field';
  // Font Awesome
  faCaretDown = faCaretDown;
  faTools = faTools;
  faTimes = faTimes;
  faArrowCircle = faArrowAltCircleRight;
  faArrowAltCircleDown = faArrowAltCircleDown;
  faArrowAltCircleUp = faArrowAltCircleUp;
  faImages = faImages;

  constructor(
    private adsSevice: AdsService,
    private as: AuthService,
    private ci: CarsInfoService,
    private afStorage: AngularFireStorage,
    private router: Router
  ) { }

  ngOnInit() {
    this.createCarForm();
    this.getCars(); 
    if (window.innerWidth <= 425) {
      this.faArrowCircle = faArrowAltCircleDown;
    }
  }

  createCarForm() {
    this.carsForm = this.adsSevice.createCarForm();
  }

  createCar() {
    this.isSaving = true;
    this.carsForm.setControl('images', new FormControl(this.imagesArr));
    this.carsForm.setControl('autor', new FormControl(this.as.userData.displyName || this.as.userData.email));
    this.carsForm.setControl('autorId', new FormControl(this.as.currentUserId));
    this.adsSevice.createCars(this.carsForm.value);
    this.router.navigate([`applications/used-cars/car-ads`]);
  }

  getCars() {
    this.usedCars = this.adsSevice.getCars();
  }

  uploadImage(event) {
    const user = JSON.parse(localStorage.getItem('user'));
    const file = event.target.files[0];
    let imgAfsId = this.carsForm.get('imgAfsId').value; // Folder Id in firebase storage
    let fileName: string;
    if (file !== undefined) {
      fileName = file.name;
    }

    if (this.carsForm.get('imgAfsId').value === null) {
      imgAfsId = Math.random().toString(36).substring(2) +
        Math.random().toString(36).substring(2);
      this.carsForm.setControl('imgAfsId', new FormControl(imgAfsId));
    }

    this.imagePath = `cars/${user.email}/${imgAfsId}/${fileName}`;

    if (file !== undefined && file.type.split('/')[0] !== 'image') {
      return alert('Only image files allowed!');
    } else {
      const ref = this.afStorage.ref(this.imagePath);
      if (ref.getDownloadURL.length <= 0) {
        const task = this.afStorage.upload(this.imagePath, file);
        this.downloadURL = task.then(() => {
          return ref.getDownloadURL().subscribe(url => {
            if (this.imagesArr.length < 6) {
              this.imageURL = url;
              this.imagesArr.push(this.imageURL);
              this.isAddImages = true;
            } else {
              alert('You can add only 6 images!');
            }
          });
        });
      } else {
        this.afStorage.ref(this.imagePath).delete();
        const task = this.afStorage.upload(this.imagePath, file);
        this.downloadURL = task.then(() => {
          return ref.getDownloadURL().subscribe(url => {
            if (this.imagesArr.length < 6) {
              this.imageURL = url;
              this.imagesArr.push(this.imageURL);
              this.isAddImages = true;
            } else {
              alert('You can add only 6 images!');
            }
          });
        });
      }
    }
  }

  showImg(url: string) {
    this.imageURL = url;
  }

  showCarMark() {
    this.carMark = !this.carMark;
    if (window.innerWidth <= 425) {
      if (this.faArrowCircle === faArrowAltCircleDown) {
        this.faArrowCircle = faArrowAltCircleUp;
        this.carMarkTitle = 'Cancel mark field';
      } else {
        this.faArrowCircle = faArrowAltCircleDown;
        this.carMarkTitle = 'Show mark field';
      }
    } else {
      if (this.faArrowCircle === faArrowAltCircleRight) {
        this.faArrowCircle = faArrowAltCircleLeft;
        this.carMarkTitle = 'Cancel mark field';
      } else {
        this.faArrowCircle = faArrowAltCircleRight;
        this.carMarkTitle = 'Show mark field';
      }
    }
  }

  showCustomBrand() {
    this.customBrand = !this.customBrand;
  }

  async deleteImage(url: string, index: number) {
    const confirmLeaving = window.confirm('Do you realy want to delete this picture?');
    if (confirmLeaving) {
      return this.afStorage.storage.refFromURL(url).delete() && this.imagesArr.splice(index, 1);
    }
  }

  searchModel(key: string) {
    this.selectedBrand = this.carsInfo.brands.filter(f => {
      return f.name === key;
    });
    this.selectedBrand.map(m => this.selectedModel = m.models);
  }

  cancelCreating() {
    this.router.navigate([`applications/used-cars/car-ads`]);
  }

  canDeactivate(): Observable<boolean> | boolean {
    if (!this.isSaving && (this.carsForm.dirty || this.isAddImages)) {
      const confirmLeaving = window.confirm('Do you realy want to leave without saving?');
      if (confirmLeaving) {
        this.imagesArr.map((url, index) => {
          this.afStorage.storage.refFromURL(url).delete();
          this.imagesArr.splice(index, 1);
        });
        this.router.navigate([`applications/used-cars/car-ads`]);
        this.isSaving = true;
        this.isAddImages = false;
      }
      return false;
    }
    return true;
  }
}
