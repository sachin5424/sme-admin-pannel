import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableMagazineComponent } from './table-magazine.component';

describe('TableMagazineComponent', () => {
  let component: TableMagazineComponent;
  let fixture: ComponentFixture<TableMagazineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableMagazineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableMagazineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
