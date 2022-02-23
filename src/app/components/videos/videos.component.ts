import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Video } from 'src/app/models/video.model';
import { VideoService } from 'src/app/services/video.service';
import { VideoDialogPlayerComponent } from '../video-dialog-player/video-dialog-player.component';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatPaginator } from '@angular/material/paginator';

const VIDEO_DATA: string[] = [
  'eHp3MbsCbMg',
  '_WWEOCQGxSw',
  'aWzlQ2N6qqg',
  '9dueaC-thEA',
  'iqM5UeQVRvI',
  'FGMBW8KaF_8',
  'Wux34Duw8rc',
  '675385832',
  '593971882',
  '482032869',
  '588496072',
  '653976088',
  '675591297'
];

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.sass']
})
export class VideosComponent implements OnInit {
  checkBox: boolean = false
  displayedColumns: string[] = ['title', 'thumbnail', 'viewCount', 'likeCount', 'uploadDate', 'delete', 'favourite'];
  dataSource!: MatTableDataSource<Video>;
  errorText?: string;
  errBlock?: boolean;
  favourite: boolean = false;
  video?: Video;
  inputUrl?: string;

  constructor(
    public dialog: MatDialog,
    private videoService: VideoService,
    private _liveAnnouncer: LiveAnnouncer
  ) { }

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  ngOnInit(): void {
    this.videoService.getVideos().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort
      this.dataSource.paginator = this.paginator;
      this.dataSource.sortingDataAccessor = (item, property) => {
        switch (property) {
          case 'uploadDate': return new Date(item.publishedAt);
          default: return (item as any)[property];
        }
      };
    })
  }

  add(url: string) {
    this.videoService.search(url).subscribe((data: any) => {
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
    }, error => {
      this.errBlock = true;
      this.errorText = error.message;
      alert(this.errorText)
    }
    );
  }

  addHardCodedVideos() {
    VIDEO_DATA.forEach(e => this.add(e));
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  addToFavourite(video: Video) {
    this.videoService.addVideoFavourite(video);
  }

  clear() {
    this.videoService.clearVideos();
    this.refresh();
  }

  delete(video: Video) {
    this.videoService.deleteVideo(video);
    this.refresh();
  }

  filterAll() {
    if (this.checkBox) {
      console.log(this.videoService.filterFavourite())
      this.dataSource = this.videoService.filterFavourite();
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    } else {
      this.refresh();
    }
  }

  openDialog(data: Video): void {
    let dialogRef = this.dialog.open(VideoDialogPlayerComponent, {
      data: {
        video: data
      }
    });
  }

  refresh(): void {
    window.location.reload();
  }
}
