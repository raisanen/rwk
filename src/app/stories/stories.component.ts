import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { trigger, state, style, animate, transition } from '@angular/animations';

import { PrismicService } from '../prismic.service';
import { ActiveTagService } from '../activetag.service';
import { PrismicDocument } from '../prismic-document';

import { ContentWithTagsComponent } from '../content-with-tags/content-with-tags.component';

@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.scss'],
  animations: [
    trigger('visible', [
      state('yes', style({transform: 'translate(0, 0)', opacity: 1})),
      transition('void => *', [
        style({transform: 'translateX(-100%)', opacity: 0}),
        animate(200)
      ]),
      transition('* => void', [
        animate(200, style({transform: 'translateY(-100%)', opacity: 0}))
      ])
    ])
  ]
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
