import { TestBed } from '@angular/core/testing';

import { AdsService } from './ads.service';

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

describe('AdsService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
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
    })
  );

  it('should be created', () => {
    const service: AdsService = TestBed.inject(AdsService);
    TestBed.inject(AngularFirestore);
    expect(service).toBeTruthy();
  });
});
