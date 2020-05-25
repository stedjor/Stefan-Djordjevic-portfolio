import { AngularFireStorage } from '@angular/fire/storage';
import { AuthService } from './../../../../_services/auth/auth.service';
import { AdsService } from './../../../../_services/cars/ads.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Cars } from './../../../../_services/cars/cars';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { formatDate } from '@angular/common';
import {
  faEdit,
  faTrashAlt,
  faComments,
  faTimes
} from '@fortawesome/free-solid-svg-icons';
import { faTelegramPlane } from '@fortawesome/free-brands-svg-icons';

declare var $: any;

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.less']
})
export class CarDetailsComponent implements OnInit {
  detailsOfCar: Cars;
  defaultPhoto = './assets/deafult-profile-icon.png';
  currentUser: any;
  index = 0;
  currentUserId: string;
  currentAutor: string;
  currentAutorEmail: string;
  urlId: string;
  ks = 1.3596216173;
  imageURL: string;
  sendImagesUrl: any;
  carDate: any;
  isCollapsed = false;
  commentForm: FormGroup;
  comments = [];
  commentDate: any;
  // Font Awesome
  faTrashAlt = faTrashAlt;
  faEdit = faEdit;
  faComments = faComments;
  faTelegramPlane = faTelegramPlane;
  faTimes = faTimes;

  constructor(
    private route: ActivatedRoute,
    private adsService: AdsService,
    private authService: AuthService,
    private afStorage: AngularFireStorage,
    private fb: FormBuilder,
  ) {
    this.route.url.subscribe(val => this.getCars(val[0].path));
  }

  ngOnInit() {
    const user = JSON.parse(localStorage.getItem('user'));
    this.getUser(user.uid);
    this.commentForm = this.fb.group({
      autor: '',
      autorEmail: '',
      createdDate: Date,
      message: ['', Validators.required],
      photoURL: ''
    });
    this.commentDate = formatDate(new Date(), 'MMM dd, yyyy, hh:mm:ss a', 'en-US');
  }

  getCars(id: string) {
    this.adsService.getCarData(id).subscribe(car => {
      this.detailsOfCar = car;

      this.sendImagesUrl = this.detailsOfCar.images;
      if (this.detailsOfCar.comments !== null) {
        this.comments = this.detailsOfCar.comments;
      }
      this.detailsOfCar.images.length !== 0 ?
        this.imageURL = this.detailsOfCar.images[this.index] :
        this.imageURL = './assets/no-car.png';
      this.carDate = this.detailsOfCar.date;
    });
    this.urlId = id;
  }

  deleteCar() {
    const confirmDelete = window.confirm('Do you realy want to delete this ads?');
    if (confirmDelete) {
      this.adsService.deleteCars(this.urlId);
      this.detailsOfCar.images.map(img => this.deleteImage(img));
    }
  }

  async deleteImage(url: string) {
    return this.afStorage.storage.refFromURL(url).delete();
  }

  nextImg() {
    this.index++;
    if (this.index > this.detailsOfCar.images.length - 1) {
      this.index = 0;
    }
    this.imageURL = this.detailsOfCar.images[this.index];
  }

  previousImg() {
    this.index--;
    if (this.index < 0) {
      this.index = this.detailsOfCar.images.length - 1;
    }
    this.imageURL = this.detailsOfCar.images[this.index];
  }

  showImg(url: string) {
    this.imageURL = url;
    this.index = this.detailsOfCar.images.indexOf(this.imageURL);
  }

  openComment() {
    $(`#collapseComment`).slideToggle(500);
    setTimeout(() => {
      window.scrollTo(0, document.body.scrollHeight);
    }, 100);
  }

  getUser(id: string) {
    this.authService.getUserData(id).subscribe(user => {
      this.currentUser = user;
      this.currentUserId = this.currentUser.uid;
      this.currentAutor = this.currentUser.displayName;
      this.currentAutorEmail = this.currentUser.email;
    });
  }

  deleteComment(index: number) {
    const confirmDelete = window.confirm('Do you realy want to delete this message?');
    if (confirmDelete) {
      this.comments.splice(index, 1);
      this.adsService.updateComments(this.urlId, this.comments);
    }
  }

  addComment() {
    this.commentForm.setControl('autor', new FormControl(this.currentUser.displayName));
    this.commentForm.setControl('autorEmail', new FormControl(this.currentUser.email));
    this.commentForm.setControl('createdDate', new FormControl(this.commentDate));
    this.commentForm.setControl('photoURL', new FormControl(this.currentUser.photoURL));
    this.comments.push(this.commentForm.value);
    this.adsService.updateComments(this.urlId, this.comments);
    this.commentForm.reset();
  }
}
