import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { User } from './../../_services/auth/user';
import { AuthService } from './../../_services/auth/auth.service';
import {
  faUserEdit,
  faTimes,
  faCheck,
  faCamera,
  faUndoAlt
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.less']
})
export class ProfileComponent implements OnInit {
  user: any;
  userData: User;
  updatedUser: any;
  defaultProfileIcon = './assets/deafult-profile-icon.png';
  editProfile = false;
  changePhoto = false;
  imagePath: string;
  downloadURL: any;
  imageURL: string;
  cancelPhotoChange: string;
  username: string;
  // font awesome
  userEditIcon = faUserEdit;
  editCancelIcon = faTimes;
  saveEditIcon = faCheck;
  faCamera = faCamera;
  faUndoAlt = faUndoAlt;

  constructor(
    public authService: AuthService,
    private afStorage: AngularFireStorage,
  ) { }

  ngOnInit() {
    setTimeout(() => {
      this.user = JSON.parse(localStorage.getItem('user'));
      if (this.user !== null) {
        this.getUser(this.user.uid);
      }
    }, 100);
  }

  getUser(id: string) {
    this.authService.getUserData(id)
      .subscribe(dataUser => {
        this.userData = dataUser;
        this.username = this.userData.displayName;
        if (this.userData.photoURL !== null) {
          this.imageURL = this.userData.photoURL;
        } else if (this.userData.photoURL === null) {
          this.imageURL = this.defaultProfileIcon;
        }
      });
  }

  editMode() {
    this.editProfile = true;
  }

  cancelEditMode() {
    if (this.changePhoto) {
      this.imageURL = null;
      this.userData.photoURL = null;
      this.afStorage.ref(this.imagePath).delete();
    }
    this.editProfile = false;
  }

  uploadImage(event: any) {
    const user = JSON.parse(localStorage.getItem('user'));
    const file = event.target.files[0];
    const fileName = file.name;
    this.imagePath = `users/${user.email}/${fileName}`;

    if (file.type.split('/')[0] !== 'image') {
      return alert('Only image files allowed');
    } else {
      const ref = this.afStorage.ref(this.imagePath);
      if (ref.getDownloadURL.length <= 0) {
        const task = this.afStorage.upload(this.imagePath, file);
        this.downloadURL = task.then(() => {
          return ref.getDownloadURL().subscribe(url => {
            this.imageURL = url;
            this.changePhoto = true;
          });
        });
      } else {
        this.afStorage.ref(this.imagePath).delete();
        const task = this.afStorage.upload(this.imagePath, file);
        this.downloadURL = task.then(() => {
          return ref.getDownloadURL().subscribe(url => {
            this.imageURL = url;
            this.changePhoto = true;
          });
        });
      }
    }
  }

  deletePhoto() {
    const confirmDelete = window.confirm('Do you realy want to delete this photo?');
    if (confirmDelete) {
      this.imageURL = this.defaultProfileIcon;
      this.userData.photoURL = null;
      this.changePhoto = false;
    }
  }

  returnProviderPhoto() {
    const confirmDelete = window.confirm('Do you realy want to return photo from provider?');
    if (confirmDelete) {
      this.userData.photoURL = this.user.photoURL;
      this.imageURL = this.userData.photoURL;
      this.changePhoto = true;
    }
  }

  updateUser() {
    this.userData.displayName = this.username;
    if (this.imageURL !== null && this.changePhoto) {
      this.userData.photoURL = this.imageURL;
    }
    this.authService.updateUserData(this.userData);
    this.editProfile = !this.editProfile;
  }
}
