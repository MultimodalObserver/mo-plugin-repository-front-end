import {Injectable} from '@angular/core';
import * as _ from "lodash";

@Injectable()
export class UrlService {

  //private _baseUrl = 'https://mo-plugin-repository.herokuapp.com/';
  private _baseUrl = 'http://localhost:3000/';


  get baseUrl(): string{
		return this._baseUrl;
	}


  build(path: string[], queryParams?: any): string {

    let url: string = this._baseUrl;

    for(let i=0; i<path.length; i++){
      if(i > 0)
        url += '/';

      url += path[i];
    }

    if(queryParams){
      url += '?';
      let first = true;

      _.forOwn(queryParams, function(value, key) {
        if(!first){
          url += '&';
        }

        first = false;
        url += `${key}=${value}`;
      });
    }

    return url;
  }

}
