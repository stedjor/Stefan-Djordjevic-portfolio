import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';

import { AngularFireAuth } from '@angular/fire/auth';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularFireStorage } from '@angular/fire/storage';
import {
  AngularFirestore,
  AngularFirestoreModule,
} from '@angular/fire/firestore';
import { environment } from '../../../environments/environment.prod';
import { AngularFireModule } from '@angular/fire';

describe('AuthService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [
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
    const service: AuthService = TestBed.inject(AuthService);
    expect(service).toBeTruthy();
  });
});
