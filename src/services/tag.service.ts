import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Angular2TokenService } from "angular2-token";

@Injectable()
export class TagService {

    constructor(private tokenAuthService: Angular2TokenService) {
    }


    public searchTags(q: string): Observable<any> {
      return this.tokenAuthService.get(`tags?q=${q}`);
    }


}
