import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UrlService } from '../url.service';
import * as _ from "lodash";


export enum Status {
  LOADING, OK, ERROR
}

@Component({
  selector: 'app-page1',
  templateUrl: './page1.component.html',
  styleUrls: ['./page1.component.css'],
  providers: [UrlService]
})
export class Page1Component implements OnInit {

  constructor(private http: HttpClient, private urlService: UrlService) {}

  // Enum reference so the HTML can see it.
  Status = Status;

  plugins: any[];
  categories: any[];
  currentStatus: Status;
  maxLengthDescription: number = 300;
  noMorePlugins: boolean;
  lastPageLoadedSuccessfully: number;
  categorySlug:string = null;

  resetSearch(){
    this.noMorePlugins = false;
    this.lastPageLoadedSuccessfully = 0;
    this.plugins = [];
    this.categorySlug = null;
  }

  setCategory(catSlug:string){
    this.resetSearch();
    this.categorySlug = catSlug;
    this.fetchPlugins();
  }

  fetchCategories(){
    this.http.get(this.urlService.getBaseUrl() + 'categories').subscribe(
      data => {
        this.categories = <Array<any>>data;
      },
    );
  }

  fetchPlugins(){

    this.currentStatus = Status.LOADING;
    var url: string;

    if(this.categorySlug == null){

      // Not filtered by category
      url = this.urlService.getBaseUrl() + 'plugins?page=' + (this.lastPageLoadedSuccessfully + 1);
    } else {

      // Filtered by category
      url = this.urlService.getBaseUrl() + 'categories/' + this.categorySlug + '/plugins?page=' + (this.lastPageLoadedSuccessfully + 1);
    }

    this.http.get(url).subscribe(
      data => {

        if((<Array<any>>data).length == 0){
          // This means the last page visited doesn't have plugins.
          // Which means that the "load more" button must disappear.
          this.noMorePlugins = true;
          this.currentStatus = Status.OK;
          return;
        }

        // Union = concatenate and remove duplicates
        this.plugins = _.unionWith(this.plugins, <Array<any>>data, (a, b) => a.id == b.id);

        // Shorten every description
        this.plugins.map((e) => e.shortDescription = e.description.length > this.maxLengthDescription);
        this.currentStatus = Status.OK;
        this.lastPageLoadedSuccessfully++;
      },
      error => {
        this.plugins = [];
        this.currentStatus = Status.ERROR;
        this.lastPageLoadedSuccessfully = 0;
      }
    );
  }

  ngOnInit() {
    this.resetSearch();
    this.categories = [];
    this.fetchPlugins();
    this.fetchCategories();
  }

}
