import { TestBed, async, inject } from '@angular/core/testing';

import { AdminGuard } from './admin.guard';

import { AngularFireAuth } from '@angular/fire/auth';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularFireStorage } from '@angular/fire/storage';
import {
  AngularFirestore,
  AngularFirestoreModule,
} from '@angular/fire/firestore';
import { environment } from '../../../../environments/environment.prod';
import { AngularFireModule } from '@angular/fire';

describe('AdminGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        AngularFireModule.initializeApp(environment.firebase),
      ],
      providers: [
        AdminGuard,
        AngularFireAuth,
        AngularFireStorage,
        { provide: AngularFirestore, depends: AngularFirestoreModule },
      ],
    });
  });

  it('should ...', inject([AdminGuard], (guard: AdminGuard) => {
    expect(guard).toBeTruthy();
  }));
});
