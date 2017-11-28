import { Component, OnInit } from '@angular/core';
import { PrismicService } from '../../prismic.service';
import { PrismicDocument } from '../../prismic-document';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  private root:PrismicDocument = new PrismicDocument();

  constructor(private prismicService: PrismicService) { }

  ngOnInit() {
    this.getRoot();
  }

  getRoot(): void {
    this.prismicService.getRoot().subscribe(resp => {
      this.root = PrismicDocument.FromResults(resp.results)[0];
    });
  }
}
