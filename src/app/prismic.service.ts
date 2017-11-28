import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { mergeMap } from 'rxjs/operators';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PrismicHelper } from '../prismic.helper';

@Injectable()
export class PrismicService {
  private static apiEndpoint = 'http://localhost:4200/api/v2';
  private static masterRef:any = null;

  constructor(private http: HttpClient) { }

  private requestWithMasterRef(endpoint):Observable<any> {
    let ret = new Observable<any>();
    if (PrismicService.masterRef != null) {
      ret = of(PrismicService.masterRef);
    } else {
      ret = this.http.get(PrismicService.apiEndpoint);
    }

    return ret.pipe(mergeMap(refData => {
      var mref = '';
      if (refData.refs) {
        for (var i = 0; i < refData.refs.length; i++) {
          if (refData.refs[i].id === 'master') {
            PrismicService.masterRef = refData.refs[i];
            mref = PrismicService.masterRef.ref;
            break;
          }
        }  
      }
      return this.http.get(endpoint + '&ref=' + mref);
    }));
  }

  private getDocuments(docType:string): Observable<any> {
    let endpoint = PrismicService.apiEndpoint + '/documents/search?format=json&q='
    return this.requestWithMasterRef(endpoint + encodeURIComponent(`[[at(document.type, "${docType}")]]`));
  }

  getRoot() : Observable<any> {
    return this.getDocuments('root');
  }

  getLinks() : Observable<any> {
    return this.getDocuments('link');
  }

  getResources() : Observable<any> {
    return this.getDocuments('resource');
  }

  getStories() : Observable<any> {
    return this.getDocuments('story');
  }
}
