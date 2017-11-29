import { ActiveTagService } from '../activetag.service';
import { PrismicDocument } from '../prismic-document';

export class ContentWithTagsComponent {
  protected selectedTag = '';

  constructor(protected activeTagService: ActiveTagService) {
    activeTagService.activeTagChanged$.subscribe(tag => {
      this.selectedTag = this.selectedTag === tag ? '' : tag;
    });
  }

  hasActiveTag(doc: PrismicDocument): boolean {
    return this.selectedTag === '' ? true : doc.Tags.indexOf(this.selectedTag) >= 0;
  }
}
