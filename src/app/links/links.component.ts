import { Component, OnInit } from '@angular/core';
import { PrismicService } from '../prismic.service';
import { ActiveTagService } from '../activetag.service';
import { PrismicDocument } from '../prismic-document';

import { ContentWithTagsComponent } from '../content-with-tags/content-with-tags.component';

@Component({
  selector: 'app-links',
  templateUrl: './links.component.html',
  styleUrls: ['./links.component.scss']
})
export class LinksComponent extends ContentWithTagsComponent implements OnInit {
  private links: PrismicDocument[] = [];

  constructor(private prismicService: PrismicService, protected activeTagService: ActiveTagService) {
    super(activeTagService);
  }

  ngOnInit() {
    this.getLinks();
  }

  getLinks(): void {
    this.prismicService.getLinks().subscribe(sres => {
      console.log(sres);
      this.links = PrismicDocument.FromResults(sres.results);
      console.log(this.links);
    });
  }
}
