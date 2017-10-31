import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { UrlService } from './url.service';

@Injectable()
export class TagService {

    constructor(private http: HttpClient, private urlService: UrlService ) {
    }

    public getTags(): Observable<any> {
      return this.http.get(this.urlService.build(['tags']));
    }

}
