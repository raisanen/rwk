import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ActiveTagService {
  private activeTagChangedSource = new Subject<string>();

  activeTagChanged$ = this.activeTagChangedSource.asObservable();

  changeActiveTag(tag: string) {
    this.activeTagChangedSource.next(tag);
  }
}
