import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarAdsComponent } from './car-ads.component';

describe('CarAdsComponent', () => {
  let component: CarAdsComponent;
  let fixture: ComponentFixture<CarAdsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarAdsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarAdsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
