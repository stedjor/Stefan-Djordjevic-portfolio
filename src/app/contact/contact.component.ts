import { Observable } from 'rxjs';
import { MessagesService } from './../_services/messages/messages.service';
import { AuthService } from './../_services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { formatDate } from '@angular/common';
import {
  faEnvelope,
  faPlay,
  faTrashAlt
} from '@fortawesome/free-solid-svg-icons';
import {
  faFacebook,
  faLinkedin
} from '@fortawesome/free-brands-svg-icons';
import { Messages } from '../_services/messages/messages';

declare var $: any;

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.less']
})
export class ContactComponent implements OnInit {
  messagesForm: FormGroup;
  messagesDate: any;
  messages: string[] = [];
  detailsOfMessages: any;
  defaultPhoto = './assets/deafult-profile-icon.png';
  photoUrl: string;
  userData: any;
  user: any;
  userId: string;
  currentAutor: string;
  compareUserId: string;
  senders: Observable<Messages>;
  sendersList = [];
  isLoggedIn: boolean;
  isLoggedInAsAdmin: boolean;
  // Font Awesome
  envelope = faEnvelope;
  facebook = faFacebook;
  linkedIn = faLinkedin;
  play = faPlay;
  faTrashAlt = faTrashAlt;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private mS: MessagesService
  ) {
    this.isLoggedIn = this.authService.isLoggedIn;
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  ngOnInit() {
    setTimeout(() => {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user !== null) {
        this.getUser(user.uid);
        this.getAllMessages(user.uid);
        this.currentAutor = user.email;
        this.showSenders();
      }
    }, 100);
    this.createMessageForm();
    this.messagesDate = formatDate(new Date(), 'MMM dd, yyyy, hh:mm:ss a', 'en-US');
  }


  showMessages(id: string) {
    this.compareUserId = id;
    setTimeout(() => {
      $('.message-box').scrollTop(1000);
    }, 100);
    this.getAllMessages(id);
  }

  cancel() {
    this.compareUserId = undefined;
    this.messages = [];
  }

  createMessageForm() {
    return this.messagesForm = this.fb.group({
      autor: '',
      photoURL: '',
      createdDate: Date,
      message: ['', Validators.required]
    });
  }

  getUser(id: string) {
    this.authService.getUserData(id).subscribe(user => {
      this.userData = user;
      this.photoUrl = user.photoURL;
      if (user.status === 'admin') {
        this.isLoggedInAsAdmin = true;
      }
    });
  }

  showSenders() {
    this.mS.getSenders().subscribe(data => {
      data.map(sender => {
        if (sender.messages.length !== undefined &&
          sender.messages.length !== 0 &&
          sender.id !== this.userId) {
            this.sendersList.push(sender);
            console.log(this.sendersList)
          }
      });
    });
  }

  getAllMessages(id: string) {
    this.detailsOfMessages = undefined;
    this.userId = id;
    this.mS.getMessages(id).subscribe(mess => {
      this.detailsOfMessages = mess;
      if (this.detailsOfMessages !== undefined) {
        this.detailsOfMessages.messages.length !== 0 ||
          this.detailsOfMessages.messages !== undefined ?
          this.messages = this.detailsOfMessages.messages :
          this.messages = [];
      }
    });
  }

  deleteMessage(index: number) {
    const confirmDelete = window.confirm('Do you realy want to delete this message?');
    if (confirmDelete) {
      this.messages.splice(index, 1);
      this.mS.updateMessages(this.userId, this.messages);
    }
  }

  createMessage() {
    this.messagesForm.setControl('autor', new FormControl(this.userData.email));
    this.messagesForm.setControl('createdDate', new FormControl(this.messagesDate));
    this.messagesForm.setControl('photoURL', new FormControl(this.photoUrl));
    this.messages.push(this.messagesForm.value);
    if (this.detailsOfMessages !== undefined) {
      this.mS.updateMessages(this.userId, this.messages);
    } else {
      this.mS.createMessage(this.userData.email, this.photoUrl, this.messages);
    }
    this.messagesForm.reset();
  }
}
