import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Video } from 'src/app/models/video.model';
import { VideoService } from 'src/app/services/video.service';
import { VideoDialogPlayerComponent } from '../video-dialog-player/video-dialog-player.component';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.sass']
})
export class VideosComponent implements OnInit {
  displayedColumns: string[] = ['title', 'thumbnail', 'viewCount', 'likeCount', 'upload date'];
  dataSource = new MatTableDataSource<Video>(JSON.parse(localStorage.getItem('Videos') || '{}'));
  errorText?: string;
  errBlock?: Boolean;
  video?: Video;
  inputUrl?: string;

  constructor(
    public dialog: MatDialog,
    private videoService: VideoService
  ) { }

  ngOnInit(): void {
    this.dataSource
  }

  add(url: string) {
    this.videoService.search(url).subscribe((data: any) => { // TODO: change into service thing
      console.log(data)
      // if (data.items) {
      //   console.log("Film niedostępny")
      // alert('Film niedostępny')
      // } else {
      this.video = {
        id: data.items ? data.items[0].id : data.video_id,
        title: data.items ? data.items[0].snippet.title : data.title,
        thumbnailUrl: data.items ? data.items[0].snippet.thumbnails.high.url : data.thumbnail_url,
        viewCount: data.items ? data.items[0].statistics.viewCount : '',
        likeCount: data.items ? data.items[0].statistics.likeCount : '',
        videoUrl: data.items ? "https://www.youtube.com/embed/" + data.items[0].id : "https://player.vimeo.com/video/" + data.video_id,
        publishedAt: data.items ? data.items[0].snippet.publishedAt : data.upload_date,
        favourite: false
      }
      this.videoService.addVideo(this.video)
      // }
    }, error => {
      this.errBlock = true;
      this.errorText = error.message;
    }
    );
  }

  openDialog(data: Video): void {
    let dialogRef = this.dialog.open(VideoDialogPlayerComponent, {
      data: {
        video: data
      }
    });
  }
}
