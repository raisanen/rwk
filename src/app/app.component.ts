import { Component } from '@angular/core';
import { PrismicService } from './prismic.service';
import { PrismicHelper } from './prismic.helper';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private root:any = {title: '', about: ''};
  title = 'app';
  constructor(private prismicService: PrismicService) {}

  ngOnInit() {
    this.getRoot();
  }

  getRoot(): void {
    this.prismicService.getRoot().subscribe(resp => {
      var rootDoc = resp.results[0];
      this.root = {
        title: PrismicHelper.GetText(rootDoc, 'site_title'),
        about: PrismicHelper.GetText(rootDoc, 'about_text')
      }
    });
  }
}
