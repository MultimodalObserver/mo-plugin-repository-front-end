import {Injectable} from '@angular/core';
@Injectable()
export class UrlService {

  private baseUrl = 'https://mo-plugin-repository.herokuapp.com/';
  //private baseUrl = 'http://localhost:3000/';


  getBaseUrl(): string {
		return this.baseUrl;
	}

}
