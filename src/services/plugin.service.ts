import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { UrlService } from './url.service';

@Injectable()
export class PluginService {


    constructor(private http: HttpClient, private urlService: UrlService ) {
    }

    public getPlugins<T>(params: any) : Observable<T> {

      let url: string;

      if(!params.hasOwnProperty('page')){
        params.page = 1;
      }

      if(!params.hasOwnProperty('categorySlug')){
        params.categorySlug = null;
      }

      if(params.categorySlug){
        // Filtered by category
        url = this.urlService.build(['categories', params.categorySlug, 'plugins'], { page: params.page });

      } else {
        // Not filtered by category
        url = this.urlService.build(['plugins'], { page: params.page });
      }

      return this.http.get<T>(url);

    }

}
