import { Component, OnInit } from '@angular/core';
import { PrismicService } from '../prismic.service';
import { ActiveTagService } from '../activetag.service';
import { PrismicDocument } from '../prismic-document';

import { ContentWithTagsComponent } from '../content-with-tags/content-with-tags.component';

@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.scss']
})

export class StoriesComponent extends ContentWithTagsComponent implements OnInit {
  stories: PrismicDocument[] = [];
  private currReadMore = '';

  constructor(private prismicService: PrismicService, protected activeTagService: ActiveTagService) {
    super(activeTagService);
  }

  ngOnInit() {
    this.getStories();
  }

  getStories() {
    this.prismicService.getStories().subscribe(res => {
      this.stories = PrismicDocument.FromResults(res.results);
    });
  }

  readMore(id: string) {
    this.currReadMore = this.currReadMore === id ? '' : id;
  }
}
