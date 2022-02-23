import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Video } from '../models/video.model';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})

export class VideoService {

    constructor(
        private httpClient: HttpClient
    ) { }
    
    addVideo(video: Video) {
        let videos = [];
        videos = [video];
        if (localStorage.getItem('Videos')) {
            videos = JSON.parse(localStorage.getItem('Videos') || '{}');
            videos = [...videos, video];
        }
        const videosCheck = JSON.parse(localStorage.getItem('Videos') || '{}')
        if (videos.length > 1) {
            if (videosCheck.find((x: { id: string; }) => x.id === video.id)) {
                alert("Film o tym id został już dodany")
            }
        }

        localStorage.setItem('Videos', JSON.stringify(videos));
    }

    addVideoFavourite(video: Video) {
        let arr = JSON.parse(localStorage.getItem('Videos') || '[]');
        const index = arr.findIndex((object: Video) => {
            return object.id === video.id
        })
        arr[index].favourite = !video.favourite;
        localStorage.setItem('Videos', JSON.stringify(arr));
    }

    clearVideos() {
        localStorage.clear();
    }

    deleteVideo(video: Video) {
        let arr = JSON.parse(localStorage.getItem('Videos') || '[]');
        const index = arr.findIndex((object: Video) => {
            return object.id === video.id
        })
        arr.splice(index, 1);
        localStorage.setItem('Videos', JSON.stringify(arr));
    }

    filterFavourite() {
        const arr = JSON.parse(localStorage.getItem('Videos') || '[]')
        const filtered = arr.filter((a: { favourite: boolean; }) => a.favourite == true)
        return filtered 
    }

    getVideos(): Observable<any[]> {
        return of(JSON.parse(localStorage.getItem('Videos') || '[]'));
    }

    parseVideo(url: string) {
        if (url.length > 11) {
            url.match(/(http:|https:|)\/\/(player.|www.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com))\/(video\/|embed\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/)
            if (RegExp.$3.indexOf('youtu') > -1 || RegExp.$3.indexOf('vimeo') > -1) {
            } else {
                alert("Uknown url");
            }
            return RegExp.$6
        }
        if ((url.length == 10) || (url.length < 9)) {
            alert("Uknown id");
        }
        return url
    }
  
    search(query: string): Observable<Object> {

        if (this.parseVideo(query).length > 9) {
            const YOUTUBE_API_KEY = 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'
            const YT_Url = "https://www.googleapis.com/youtube/v3/videos?id=" + this.parseVideo(query) + "&key=" + YOUTUBE_API_KEY + "&part=snippet,statistics&fields=items(id,snippet,statistics)"
            return this.httpClient.get(YT_Url)
        }
        const VIMEO_Url = "https://vimeo.com/api/oembed.json?url=https%3A//vimeo.com/" + this.parseVideo(query)
        return this.httpClient.get(VIMEO_Url).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error instanceof HttpErrorResponse) {
                    return throwError(error);
                } else {
                    return throwError(error);
                }
            })
        );

    }

}
