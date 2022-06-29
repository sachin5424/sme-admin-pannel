import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAddEditComponent } from './new-add-edit.component';

describe('NewAddEditComponent', () => {
  let component: NewAddEditComponent;
  let fixture: ComponentFixture<NewAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewAddEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
