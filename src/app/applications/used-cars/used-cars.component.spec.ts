import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UsedCarsComponent } from './used-cars.component';

describe('UsedCarsComponent', () => {
  let component: UsedCarsComponent;
  let fixture: ComponentFixture<UsedCarsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UsedCarsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsedCarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
