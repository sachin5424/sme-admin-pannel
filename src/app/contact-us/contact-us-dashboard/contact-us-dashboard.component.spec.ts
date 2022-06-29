import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactUsDashboardComponent } from './contact-us-dashboard.component';

describe('ContactUsDashboardComponent', () => {
  let component: ContactUsDashboardComponent;
  let fixture: ComponentFixture<ContactUsDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactUsDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactUsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
