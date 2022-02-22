import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VideosComponent } from './components/videos/videos.component';

const routes: Routes = [
  {
    path: '', component: VideosComponent
  },
  {
    path: 'Home', component: VideosComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
