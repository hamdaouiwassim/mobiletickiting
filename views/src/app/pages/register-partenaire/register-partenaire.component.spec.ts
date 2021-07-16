import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterPartenaireComponent } from './register-partenaire.component';

describe('RegisterPartenaireComponent', () => {
  let component: RegisterPartenaireComponent;
  let fixture: ComponentFixture<RegisterPartenaireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterPartenaireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterPartenaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
