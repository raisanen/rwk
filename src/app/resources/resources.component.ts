import { Component, OnInit } from '@angular/core';
import { PrismicService } from '../prismic.service';
import { PrismicDocument } from '../prismic-document';
@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.scss']
})
export class ResourcesComponent implements OnInit {
  private resources:PrismicDocument[] = [];

  constructor(private prismicService: PrismicService) { }

  ngOnInit() {
    this.getResources();
  }

  getResources():void {
    this.prismicService.getResources().subscribe(res => {
      console.log(res.results);
      this.resources = PrismicDocument.FromResults(res.results);
      console.log(this.resources);
    });
  }
}

