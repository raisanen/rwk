import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
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
  allTags: string[] = [];
  tagCounts = {};

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
      this.allTags = [];
      this.tagCounts = {};

      this.stories.forEach((s) => {
        s.Tags.forEach(t => {
          if (!this.tagCounts[t]) {
            this.tagCounts[t] = 0;
          }
          this.tagCounts[t]++;
        });
      });
      this.tagCounts['simh'] = 5;

      for (var k in this.tagCounts) {
        this.allTags.push(k);
      }

      this.allTags = this.allTags.sort((a, b) => this.tagCounts[b] - this.tagCounts[a]);
    });
  }

  readMore(id: string) {
    this.currReadMore = this.currReadMore === id ? '' : id;
  }
}
