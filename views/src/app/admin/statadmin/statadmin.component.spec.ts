import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatadminComponent } from './statadmin.component';

describe('StatadminComponent', () => {
  let component: StatadminComponent;
  let fixture: ComponentFixture<StatadminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatadminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
