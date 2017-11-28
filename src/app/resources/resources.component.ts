import { Component, OnInit } from '@angular/core';
import { PrismicService } from '../prismic.service';
import { ActiveTagService } from '../activetag.service';
import { PrismicDocument } from '../prismic-document';

import { ContentWithTagsComponent } from '../content-with-tags/content-with-tags.component';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.scss']
})
export class ResourcesComponent extends ContentWithTagsComponent implements OnInit {
  private resources: PrismicDocument[] = [];

  constructor(private prismicService: PrismicService, protected activeTagService: ActiveTagService) {
    super(activeTagService);
   }

  ngOnInit() {
    this.getResources();
  }

  getResources(): void {
    this.prismicService.getResources().subscribe(res => {
      this.resources = PrismicDocument.FromResults(res.results);
    });
  }
}

