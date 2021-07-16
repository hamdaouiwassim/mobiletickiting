import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationcComponent } from './reservationc.component';

describe('ReservationcComponent', () => {
  let component: ReservationcComponent;
  let fixture: ComponentFixture<ReservationcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReservationcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservationcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
