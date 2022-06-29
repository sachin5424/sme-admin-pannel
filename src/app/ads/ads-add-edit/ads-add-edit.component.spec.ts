import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdsAddEditComponent } from './ads-add-edit.component';

describe('AdsAddEditComponent', () => {
  let component: AdsAddEditComponent;
  let fixture: ComponentFixture<AdsAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdsAddEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdsAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
