import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideosAddEditComponent } from './videos-add-edit.component';

describe('VideosAddEditComponent', () => {
  let component: VideosAddEditComponent;
  let fixture: ComponentFixture<VideosAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VideosAddEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VideosAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
