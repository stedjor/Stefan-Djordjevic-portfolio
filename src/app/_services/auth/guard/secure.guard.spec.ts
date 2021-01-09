import { TestBed, inject, waitForAsync } from '@angular/core/testing';

import { SecureGuard } from './secure.guard';

import { AngularFireAuth } from '@angular/fire/auth';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularFireStorage } from '@angular/fire/storage';
import {
  AngularFirestore,
  AngularFirestoreModule,
} from '@angular/fire/firestore';
import { environment } from '../../../../environments/environment.prod';
import { AngularFireModule } from '@angular/fire';

describe('SecureGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        AngularFireModule.initializeApp(environment.firebase),
      ],
      providers: [
        SecureGuard,
        AngularFireAuth,
        AngularFireStorage,
        { provide: AngularFirestore, depends: AngularFirestoreModule },
      ],
    });
  });

  it('should ...', inject([SecureGuard], (guard: SecureGuard) => {
    expect(guard).toBeTruthy();
  }));
});
