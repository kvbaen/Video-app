import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-add-video',
  templateUrl: './add-video.component.html',
  styleUrls: ['./add-video.component.sass']
})
export class AddVideoComponent {
  @Output() inputUrl = new EventEmitter<string>()
  
  constructor() { }

  addNewVideo(value: string) {
    this.inputUrl.emit(value);
  }

}
