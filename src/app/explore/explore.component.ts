import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PluginService } from '../../services/plugin.service';
import { CategoryService } from '../../services/category.service';
import * as _ from "lodash";

export enum Status {
  LOADING, OK, ERROR
}

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.css']
})
export class ExploreComponent implements OnInit {

  constructor(private http: HttpClient, private categoryService: CategoryService, private pluginService: PluginService) {}

  // Enum reference so the HTML can see it.
  Status = Status;

  plugins: any[] = [];
  categories: any[] = [];
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
    this.categoryService.getCategories()
    .subscribe(
      data => {
        this.categories = <Array<any>>data;
      },
    );
  }

  fetchPlugins(){

    this.currentStatus = Status.LOADING;
    var url: string;

    var params = {
      categorySlug: this.categorySlug,
      page: this.lastPageLoadedSuccessfully + 1
    };


    this.pluginService.getPlugins(params)
    .subscribe(
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
    this.fetchPlugins();
    this.fetchCategories();
  }

}
