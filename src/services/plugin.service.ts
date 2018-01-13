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

    public getLatestPlugins<T>(): Observable<T>{
      let url: string = this.urlService.build(['plugins'], { latest: true });
      return this.http.get<T>(url);
    }

    public showPlugin(pluginSlug: string): any{
      return this.tokenAuthService.get(`plugins/${pluginSlug}`);
    }

    public removeTag(pluginId: number, tagId: number){
      return this.tokenAuthService.delete(`plugins/${pluginId}/tags/${tagId}`);
    }

    public removePlugin(pluginId: number){
      return this.tokenAuthService.delete(`plugins/${pluginId}`);
    }

    public addTag(pluginId: number, tagName: string){
      return this.tokenAuthService.post(`plugins/${pluginId}/tags`, {
        tag_name: tagName
      });
    }

    public editPlugin(id: number, plugin: any): any{
      return this.tokenAuthService.put(`plugins/${id}`, plugin);
    }

    public createPlugin(plugin: any): any{
      return this.tokenAuthService.post("plugins", plugin);
    }


    public getPlugins<T>(params: any) : Observable<T> {

      let url: string;

      if(!params.hasOwnProperty('page')){
        params.page = 1;
      }

      // If it has a query param, also tell the backend to perform
      // a plugin search by tags.
      if(params.hasOwnProperty('q')){
        params['include_tags_search'] = true;
      }

      url = this.urlService.build(['plugins'], params);

      return this.http.get<T>(url);

    }

}
