import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
    providedIn: 'root'
})

export class VideoService {

    constructor(
        private httpClient: HttpClient
    ) { 
    }

    parseVideo(url: string) {
        if (url.length > 11) {
            url.match(/(http:|https:|)\/\/(player.|www.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com))\/(video\/|embed\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/)
            return RegExp.$6
        }
        return url
    }

    search(query: string): any {
        console.log(this.parseVideo(query))
        if (this.parseVideo(query).length > 9) {
            const YOUTUBE_API_KEY = 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'
            const YT_Url = "https://www.googleapis.com/youtube/v3/videos?id=" + this.parseVideo(query) + "&key=" + YOUTUBE_API_KEY + "&part=snippet,statistics&fields=items(id,snippet,statistics)"
            return this.httpClient.get(YT_Url)
        }
        const VIMEO_Url = "https://vimeo.com/api/oembed.json?url=https%3A//vimeo.com/" + this.parseVideo(query)
        return this.httpClient.get(VIMEO_Url)
    }
}
