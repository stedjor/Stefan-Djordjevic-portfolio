import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FourSquareComponent } from './four-square.component';

describe('FourSquareComponent', () => {
  let component: FourSquareComponent;
  let fixture: ComponentFixture<FourSquareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FourSquareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FourSquareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
