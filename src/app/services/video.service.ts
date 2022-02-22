import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Video } from '../models/video.model';
import { Observable, throwError } from 'rxjs';
import { catchError } from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})

export class VideoService {

    constructor(
        private httpClient: HttpClient
    ) { }

    parseVideo(url: string) {
        const pattern = new RegExp('/(http:|https:|)\/\/(player.|www.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com))\/(video\/|embed\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/')
        if (url.length > 11) {
            url.match(/(http:|https:|)\/\/(player.|www.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com))\/(video\/|embed\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/)
            // console.log(pattern.test())
            if (RegExp.$3.indexOf('youtu') > -1 || RegExp.$3.indexOf('vimeo') > -1) {
            } else {
                alert("Uknown url")
            }
            //console.log(url.match(/(http:|https:|)\/\/(player.|www.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com))\/(video\/|embed\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/))
            return RegExp.$6
        }
        if ((url.length == 10) || (url.length < 9)) {
            alert("Uknown id")
        }
        return url
    }

    search(query: string): Observable<Object> {
        // console.log(this.parseVideo(query))
        let idLenght = this.parseVideo(query).length
        if (idLenght > 9) {
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

    addVideo(video: Video) {
        let videos = [];
        videos = [video];
        if (localStorage.getItem('Videos')) {
            videos = JSON.parse(localStorage.getItem('Videos') || '{}');
            videos = [video, ...videos];
        }
        const videosCheck = JSON.parse(localStorage.getItem('Videos') || '{}')
        // if (videosCheck.find((x: { id: string; }) => x.id === video.id)) {
            // console.error("juz jest film o tym id");
        // }
        localStorage.setItem('Videos', JSON.stringify(videos));
    }

}
