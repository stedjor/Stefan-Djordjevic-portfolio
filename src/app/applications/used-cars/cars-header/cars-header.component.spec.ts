import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarsHeaderComponent } from './cars-header.component';
import { ReactiveFormsModule } from '@angular/forms';

import { AngularFireAuth } from '@angular/fire/auth';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularFireStorage } from '@angular/fire/storage';
import {
  AngularFirestore,
  AngularFirestoreModule,
} from '@angular/fire/firestore';
import { environment } from '../../../../environments/environment.prod';
import { AngularFireModule } from '@angular/fire';

describe('CarsHeaderComponent', () => {
  let component: CarsHeaderComponent;
  let fixture: ComponentFixture<CarsHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        AngularFireModule.initializeApp(environment.firebase),
      ],
      declarations: [CarsHeaderComponent],
      providers: [
        AngularFireAuth,
        AngularFireStorage,
        { provide: AngularFirestore, depends: AngularFirestoreModule },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarsHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
