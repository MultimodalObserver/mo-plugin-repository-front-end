import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { UrlService } from './url.service';
import {Angular2TokenService} from "angular2-token";
import { Response } from '@angular/http';

@Injectable()
export class PluginService {


    constructor(private http: HttpClient, private urlService: UrlService, private tokenAuthService: Angular2TokenService) {
    }

    public getGithubInfo<T>(username: string, repo: string): Observable<T>{
      let repoApi = `https://api.github.com/repos/${username}/${repo}`;
      return this.http.get<T>(repoApi);
    }

    public createPlugin(plugin: any): any{
      return this.tokenAuthService.post("plugins", plugin);
    }

    public getPlugins<T>(params: any) : Observable<T> {

      let url: string;

      if(!params.hasOwnProperty('page')){
        params.page = 1;
      }

      if(!params.hasOwnProperty('tagSlug')){
        params.tagSlug = null;
      }

      if(params.tagSlug){
        // Filtered by tag
        url = this.urlService.build(['tags', params.tagSlug, 'plugins'], { page: params.page });

      } else {
        // Not filtered by tag
        url = this.urlService.build(['plugins'], { page: params.page });
      }

      return this.http.get<T>(url);

    }

}
