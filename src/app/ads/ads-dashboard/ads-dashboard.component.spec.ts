import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdsDashboardComponent } from './ads-dashboard.component';

describe('AdsDashboardComponent', () => {
  let component: AdsDashboardComponent;
  let fixture: ComponentFixture<AdsDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdsDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
