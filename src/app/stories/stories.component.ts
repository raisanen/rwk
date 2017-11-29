import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { trigger, state, style, animate, transition } from '@angular/animations';

import { PrismicService } from '../prismic.service';
import { ActiveTagService } from '../activetag.service';
import { PrismicDocument } from '../prismic-document';

import { ContentWithTagsComponent } from '../content-with-tags/content-with-tags.component';

import { environment } from '../../environments/environment';
import { debounce } from 'rxjs/operators/debounce';

@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.scss'],
  animations: [
    trigger('visible', [
      state('yes', style({transform: 'translateX(0)', opacity: 1})),
      transition('void => *', [
        style({transform: 'translateX(-100%)', opacity: 0}),
        animate(200)
      ]),
      transition('* => void', [
        animate(200, style({transform: 'translateX(100%)', opacity: 0}))
      ])
    ])
  ]
})

export class StoriesComponent extends ContentWithTagsComponent implements OnInit {
  stories: PrismicDocument[] = [];
  allTags: string[] = [];
  tagCounts = {};
  orderDescending = true;

  private currReadMore = '';

  constructor(private prismicService: PrismicService, protected activeTagService: ActiveTagService) {
    super(activeTagService);
  }

  ngOnInit() {
    this.getStories();
  }

  sortStories() {
    this.stories = this.stories.sort((sa, sb) => {
      if (sa.Date < sb.Date) {
        return this.orderDescending ? 1 : -1;
      } else if (sb.Date < sa.Date) {
        return this.orderDescending ? -1 : 1;
      }
      return 0;
    });
  }
  setOrder(descending: boolean) {
    this.orderDescending = descending;
    this.sortStories();
  }

  getStories() {
    this.prismicService.getStories().subscribe(res => {
      const today = new Date();
      this.stories = PrismicDocument.FromResults(res.results)
        .filter(s => s.Date <= today || environment.production === false); // Hide future stories in prod

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

      for (const k in this.tagCounts) {
        if (this.tagCounts.hasOwnProperty(k)) {
          this.allTags.push(k);
        }
      }

      this.allTags = this.allTags.sort((a, b) => this.tagCounts[b] - this.tagCounts[a]);
      this.sortStories();
    });
  }

  readMore(id: string) {
    this.currReadMore = this.currReadMore === id ? '' : id;
  }
}
