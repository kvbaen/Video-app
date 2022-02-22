import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { Video } from 'src/app/models/video.model';

@Component({
  selector: 'app-video-dialog-player',
  templateUrl: './video-dialog-player.component.html',
  styleUrls: ['./video-dialog-player.component.sass']
})
export class VideoDialogPlayerComponent implements OnInit {
  url?: SafeResourceUrl;

  constructor(
    private _sanitizer: DomSanitizer,
    public dialogRef: MatDialogRef<VideoDialogPlayerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { video: Video }) { }

  ngOnInit(): void {
    this.url = this._sanitizer.bypassSecurityTrustResourceUrl(this.data.video.videoUrl);
  }

}
