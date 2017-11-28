import { Component, OnInit } from '@angular/core';
import { PrismicService } from '../prismic.service';
import { PrismicHelper } from '../prismic.helper';

@Component({
  selector: 'app-links',
  templateUrl: './links.component.html',
  styleUrls: ['./links.component.scss']
})
export class LinksComponent implements OnInit {
  private links:any[] = [];
  constructor(private prismicService: PrismicService) {}

  ngOnInit() {
    this.getLinks();
  }

  getLinks():void {
    this.prismicService.getLinks().subscribe(sres => {
      this.links = sres.results.map(r => {
        return {
          title: PrismicHelper.GetText(r, 'title'),
          description: PrismicHelper.GetText(r, 'description'),
          links: PrismicHelper.GetArray(r, 'links')
        }
      });

      console.log(this.links);
    })
  }
}
