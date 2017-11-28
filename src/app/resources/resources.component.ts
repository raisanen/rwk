import { Component, OnInit } from '@angular/core';
import { PrismicService } from '../prismic.service';
import { PrismicHelper } from '../prismic.helper';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.scss']
})
export class ResourcesComponent implements OnInit {
  private resources:any[] = [];

  constructor(private prismicService: PrismicService) { }

  ngOnInit() {
    this.getResources();
  }

  getResources():void {
    this.prismicService.getResources().subscribe(res => {
      console.log(res.results);
      this.resources = res.results.map(r => {
        return {
          title: PrismicHelper.GetText(r, 'name'),
          description: PrismicHelper.GetText(r, 'description'),
          files: PrismicHelper.GetArray(r, 'files')
        }; 
      });
    });
  }
}

