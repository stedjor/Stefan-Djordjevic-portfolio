import { TestBed } from '@angular/core/testing';

import { MessagesService } from './messages.service';
import { ReactiveFormsModule } from '@angular/forms';

import { AngularFireAuth } from '@angular/fire/auth';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularFireStorage } from '@angular/fire/storage';
import {
  AngularFirestore,
  AngularFirestoreModule,
} from '@angular/fire/firestore';
import { environment } from '../../../environments/environment.prod';
import { AngularFireModule } from '@angular/fire';

describe('MessagesService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      ReactiveFormsModule,
      RouterTestingModule,
      AngularFireModule.initializeApp(environment.firebase),
    ],
    providers: [
      AngularFireAuth,
      AngularFireStorage,
      { provide: AngularFirestore, depends: AngularFirestoreModule },
    ],
  }));

  it('should be created', () => {
    const service: MessagesService = TestBed.inject(MessagesService);
    expect(service).toBeTruthy();
  });
});
