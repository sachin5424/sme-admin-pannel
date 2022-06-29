import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactUsAddEditComponent } from './contact-us-add-edit.component';

describe('ContactUsAddEditComponent', () => {
  let component: ContactUsAddEditComponent;
  let fixture: ComponentFixture<ContactUsAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactUsAddEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactUsAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
