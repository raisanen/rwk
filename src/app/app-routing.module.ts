import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IndexComponent } from './routes/index/index.component';
import { StoryComponent } from './routes/story/story.component';

const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'story/:id', component: StoryComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
