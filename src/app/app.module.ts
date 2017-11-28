import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { PrismicService } from './prismic.service';
import { LinksComponent } from './links/links.component';
import { IndexComponent } from './routes/index/index.component';
import { ResourcesComponent } from './resources/resources.component';
import { StoriesComponent } from './stories/stories.component';
import { StoryComponent } from './routes/story/story.component';


@NgModule({
  declarations: [
    AppComponent,
    LinksComponent,
    IndexComponent,
    ResourcesComponent,
    StoriesComponent,
    StoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [PrismicService],
  bootstrap: [AppComponent]
})
export class AppModule { }
