import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { PrismicService } from './prismic.service';
import { LinksComponent } from './links/links.component';
import { IndexComponent } from './index/index.component';


@NgModule({
  declarations: [
    AppComponent,
    LinksComponent,
    IndexComponent
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
