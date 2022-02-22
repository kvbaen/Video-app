import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoDialogPlayerComponent } from './video-dialog-player.component';

describe('VideoDialogPlayerComponent', () => {
  let component: VideoDialogPlayerComponent;
  let fixture: ComponentFixture<VideoDialogPlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VideoDialogPlayerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoDialogPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
