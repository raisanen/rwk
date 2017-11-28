import { Component } from '@angular/core';
import { PrismicService } from './prismic.service';
import { PrismicHelper } from './prismic.helper';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'app';
  constructor() {}
}
