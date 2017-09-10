import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable()
export class SearchParamsService {

  private categorySlug: Subject<string> = new Subject<string>();

  categorySlug$ : Observable<string> = this.categorySlug.asObservable();

  updateCategorySlug(slug: string) {
    this.categorySlug.next(slug);
  }

}
