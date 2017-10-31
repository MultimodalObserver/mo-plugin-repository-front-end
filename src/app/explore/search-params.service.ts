import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable()
export class SearchParamsService {

  private tagSlug: Subject<string> = new Subject<string>();

  tagSlug$ : Observable<string> = this.tagSlug.asObservable();

  updateTagSlug(slug: string) {
    this.tagSlug.next(slug);
  }

}
