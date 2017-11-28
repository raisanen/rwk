import { Component, OnInit } from '@angular/core';
import { PrismicService } from '../prismic.service';
import { PrismicHelper } from '../prismic.helper';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  private root:any = {title: '', about: ''};

  constructor(private prismicService: PrismicService) { }

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
