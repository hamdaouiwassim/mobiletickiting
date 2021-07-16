import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatpComponent } from './statp.component';

describe('StatpComponent', () => {
  let component: StatpComponent;
  let fixture: ComponentFixture<StatpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
