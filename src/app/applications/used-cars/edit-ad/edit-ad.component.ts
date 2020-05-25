import { Observable } from 'rxjs';
import { AdsService } from './../../../_services/cars/ads.service';
import { CarsInfoService } from './../../../_services/cars/cars-info.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import {
  faSave,
  faCaretDown,
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
  selector: 'app-edit-ad',
  templateUrl: './edit-ad.component.html',
  styleUrls: ['./edit-ad.component.less']
})
export class EditAdComponent implements OnInit {
  carsForm: FormGroup;
  isUpdating = false;
  isEditImages = false;
  imagePath: string;
  imageURL: string;
  imagesArr: string[];
  addedImgArr: string[];
  downloadURL: any;
  carsInfo: any;
  selectedBrand: any[];
  selectedModel: string[];
  selectedModelValue: string;
  selectedCountryValue: string;
  paramId: string;
  customBrand = false;
  carMarkShowen = false;
  carMarkTitle = 'Show mark field';
  // Font Awesome
  faCaretDown = faCaretDown;
  faSave = faSave;
  faTimes = faTimes;
  faArrowCircle = faArrowAltCircleRight;
  faArrowAltCircleDown = faArrowAltCircleDown;
  faArrowAltCircleUp = faArrowAltCircleUp;
  faImages = faImages;

  constructor(
    private adsSevice: AdsService,
    private ci: CarsInfoService,
    private route: ActivatedRoute,
    private router: Router,
    private afStorage: AngularFireStorage) {
  }

  ngOnInit() {
    this.imagesArr = [];
    this.addedImgArr = [];
    this.imageURL = this.imagesArr[this.imagesArr.length - 1];
    this.paramId = this.route.snapshot.paramMap.get('id');
    this.carsInfo = this.ci.carsInfo;
    this.createCarForm();
    this.getCars();
    if (window.innerWidth <= 425) {
      this.faArrowCircle = faArrowAltCircleDown;
    }
  }

  createCarForm() {
    this.carsForm = this.adsSevice.createCarForm();
  }

  editCarForm(usedForm: any) {
    this.carsForm.patchValue({
      autor: usedForm.autor,
      autorId: usedForm.autorId,
      images: usedForm.images,
      date: usedForm.date,
      imgAfsId: usedForm.imgAfsId,
      saller: {
        country: usedForm.saller.countries,
        town: usedForm.saller.town,
        adress: usedForm.saller.adress,
        adressNumber: usedForm.saller.adressNumber,
        phone: usedForm.saller.phone
      },
      car: {
        brand: usedForm.car.brand,
        model: usedForm.car.model,
        carMark: usedForm.car.carMark,
        age: usedForm.car.age,
        price: usedForm.car.price,
        engine: usedForm.car.engine,
        transmission: usedForm.car.transmission,
        kwKs: usedForm.car.kwKs,
        fuels: usedForm.car.fuels,
        colors: usedForm.car.colors,
        mileage: usedForm.car.mileage,
        doors: usedForm.car.doors,
        seats: usedForm.car.seats
      }
    });
    this.selectedModelValue = usedForm.car.model;
    this.selectedCountryValue = usedForm.saller.countries;
    this.searchModel(usedForm.car.brand);
    this.checkIfCustomBrand(usedForm.car.brand, usedForm.car.model, usedForm.car.carMark);
  }

  checkIfCustomBrand(cBrand: string, cModel: string, cMark: string) {
    if (this.selectedBrand.length !== 0) {
      this.selectedBrand.map(mBrand => {
        if (mBrand.name === cBrand) {
          this.customBrand = this.selectedModel.some(someModel => {
            return (someModel === cModel);
          });
          this.customBrand = !this.customBrand;
        }
      });
    } else {
      this.customBrand = true;
    }

    if (window.innerWidth <= 425) {
      if (cMark !== '' && cMark !== undefined) {
        this.carMarkShowen = true;
        this.faArrowCircle = faArrowAltCircleUp;
        this.carMarkTitle = 'Cancel mark field';
      } else {
        this.carMarkShowen = false;
        this.faArrowCircle = faArrowAltCircleDown;
        this.carMarkTitle = 'Show mark field';
      }
    } else {
      if (cMark !== '' && cMark !== undefined) {
        this.carMarkShowen = true;
        this.faArrowCircle = faArrowAltCircleLeft;
        this.carMarkTitle = 'Cancel mark field';
      } else {
        this.carMarkShowen = false;
        this.faArrowCircle = faArrowAltCircleRight;
        this.carMarkTitle = 'Show mark field';
      }
    }
    this.customBrand ? this.selectedModelValue = '' : this.selectedModelValue = cModel;
  }

  searchModel(key: string) {
    this.selectedBrand = this.carsInfo.brands.filter(f => {
      return f.name === key;
    });
    this.selectedBrand.map(m => this.selectedModel = m.models);
  }

  showCarMark() {
    this.carMarkShowen = !this.carMarkShowen;
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

  uploadImage(event: any) {
    const user = JSON.parse(localStorage.getItem('user'));
    let imgAfsId = this.carsForm.get('imgAfsId').value; // Folder Id in firebase storage
    const file = event.target.files[0];
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
              this.addedImgArr.push(this.imageURL);
              this.imagesArr.push(this.imageURL);
              this.isEditImages = true;
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
              this.addedImgArr.push(this.imageURL);
              this.imagesArr.push(this.imageURL);
              this.isEditImages = true;
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

  async deleteImage(url: string, index: number) {
    const confirmLeaving = window.confirm('Do you realy want to delete this picture?');
    if (confirmLeaving) {
      return this.afStorage.storage.refFromURL(url).delete() && this.imagesArr.splice(index, 1);
    }
  }

  getCars() {
    return this.adsSevice.getCarData(this.paramId)
      .subscribe(car => {
        car.images.map(m => {
          this.imagesArr.push(m);
          this.imageURL = this.imagesArr[0];
        });
        return this.editCarForm(car);
      });
  }

  updateCars() {
    this.isUpdating = true;
    this.imagesArr.concat(this.addedImgArr);
    this.carsForm.setControl('images', new FormControl(this.imagesArr));
    this.adsSevice.updateCars(this.paramId, this.carsForm.value);
    this.router.navigate([`applications/used-cars/car-ads/${this.paramId}`]);
  }

  cancelEditing() {
    this.router.navigate([`applications/used-cars/car-ads/${this.paramId}`]);
  }

  canDeactivate(): Observable<boolean> | boolean {
    if (!this.isUpdating && (this.carsForm.dirty || this.isEditImages)) {
      const confirmLeaving = window.confirm('Do you realy want to leave without saving?');
      if (confirmLeaving) {
        this.addedImgArr.map((url, index) => {
          this.afStorage.storage.refFromURL(url).delete();
          this.imagesArr.splice(index, 1);
        });
        this.router.navigate([`applications/used-cars/car-ads/${this.paramId}`]);
        this.isUpdating = true;
        this.isEditImages = false;
      }
      return false;
    }
    return true;
  }
}
