import {Injectable} from '@angular/core';
@Injectable()
export class UrlService {
  getBaseUrl(): string {
		return 'https://mo-plugin-repository.herokuapp.com/';
	}

  getLocalhostBaseUrl(): string {
		return 'http://localhost:3000/';
	}
}
