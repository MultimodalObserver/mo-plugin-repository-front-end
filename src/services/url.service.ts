import {Injectable} from '@angular/core';
import * as _ from "lodash";

@Injectable()
export class UrlService {



  get baseUrl(): string{

    if (location.hostname === "localhost" || location.hostname === "127.0.0.1"){
      return 'http://localhost:3000/';
    }

		return 'http://mo-plugin-repository.herokuapp.com/';
	}


  build(path: string[], queryParams?: any): string {

    let url: string = this.baseUrl;

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
