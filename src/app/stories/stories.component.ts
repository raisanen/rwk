import { Component, OnInit } from '@angular/core';
import { PrismicService } from '../prismic.service';
import { PrismicDocument } from '../prismic-document';

@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.scss']
})

export class StoriesComponent implements OnInit {
  stories:PrismicDocument[] = [];

  constructor(private prismicService: PrismicService) { }

  ngOnInit() {
    this.getStories()
  }

  getStories() {
    this.prismicService.getStories().subscribe(res => {
      console.log(res);
      this.stories = PrismicDocument.FromResults(res.results);
      console.log(this.stories);
    });
  }
}
