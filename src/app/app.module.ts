import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LinksComponent } from './links/links.component';
import { IndexComponent } from './routes/index/index.component';
import { ResourcesComponent } from './resources/resources.component';
import { StoriesComponent } from './stories/stories.component';
import { TagListComponent } from './tag-list/tag-list.component';

import { PrismicService } from './prismic.service';
import { ActiveTagService } from './activetag.service';
import { ContentWithTagsComponent } from './content-with-tags/content-with-tags.component';

@NgModule({
  declarations: [
    AppComponent,
    LinksComponent,
    IndexComponent,
    ResourcesComponent,
    StoriesComponent,
    TagListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [PrismicService, ActiveTagService],
  bootstrap: [AppComponent]
})
export class AppModule { }
