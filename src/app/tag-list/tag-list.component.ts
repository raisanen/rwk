import { Component, OnInit, Input } from '@angular/core';
import { ActiveTagService } from '../activetag.service';

@Component({
  selector: 'app-tag-list',
  templateUrl: './tag-list.component.html',
  styleUrls: ['./tag-list.component.scss']
})
export class TagListComponent implements OnInit {
  @Input() tags: string[];
  @Input() title = 'Tags';

  private activeTag = '';

  constructor(private activeTagService: ActiveTagService) {
    activeTagService.activeTagChanged$.subscribe(tag => this.activeTag = this.activeTag === tag ? '' : tag);
  }

  ngOnInit() {
  }

  setTag(tag: string) {
    this.activeTagService.changeActiveTag(tag);
  }
}
