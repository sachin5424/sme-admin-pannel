import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardMagazineComponent } from './dashboard-magazine.component';

describe('DashboardMagazineComponent', () => {
  let component: DashboardMagazineComponent;
  let fixture: ComponentFixture<DashboardMagazineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardMagazineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardMagazineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
