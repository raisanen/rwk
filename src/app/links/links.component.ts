import { Component, OnInit } from '@angular/core';
import { PrismicService } from '../prismic.service';
import { PrismicDocument } from '../prismic-document';

@Component({
  selector: 'app-links',
  templateUrl: './links.component.html',
  styleUrls: ['./links.component.scss']
})
export class LinksComponent implements OnInit {
  private links: PrismicDocument[] = [];

  constructor(private prismicService: PrismicService) {}

  ngOnInit() {
    this.getLinks();
  }

  getLinks(): void {
    this.prismicService.getLinks().subscribe(sres => {
      this.links = PrismicDocument.FromResults(sres.results);
    });
  }
}
