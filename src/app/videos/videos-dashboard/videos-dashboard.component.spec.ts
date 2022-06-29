import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideosDashboardComponent } from './videos-dashboard.component';

describe('VideosDashboardComponent', () => {
  let component: VideosDashboardComponent;
  let fixture: ComponentFixture<VideosDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VideosDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VideosDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
