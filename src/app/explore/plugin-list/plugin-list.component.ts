import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PluginService } from '../../../services/plugin.service';
import { SearchParamsService } from '../search-params.service';
import { Subscription } from 'rxjs/Subscription';
import * as _ from 'lodash';

export enum Status {
  LOADING, OK, ERROR
}

@Component({
  selector: 'app-plugin-list',
  templateUrl: './plugin-list.component.html',
  styleUrls: ['./plugin-list.component.css']
})
export class PluginListComponent implements OnInit {

  // Enum reference so the HTML can see it.
  Status = Status;

  plugins: any[] = [];

  currentStatus: Status;
  maxLengthDescription = 300;
  noMorePlugins: boolean;
  private lastPageLoadedSuccessfully: number;
  private paramSubscription: Subscription;
  private categorySlug: string;

  constructor(private route: ActivatedRoute, private pluginService: PluginService, private searchParamsService: SearchParamsService) {
  }

  private resetSearch() : void {
    this.noMorePlugins = false;
    this.lastPageLoadedSuccessfully = 0;
    this.plugins = [];
    this.categorySlug = null;
  }

  fetchPlugins() : void {

    this.currentStatus = Status.LOADING;
    let url: string;

    const params = {
      categorySlug: this.categorySlug,
      page: this.lastPageLoadedSuccessfully + 1
    };


    this.pluginService.getPlugins(params)
    .subscribe(
      data => {

        if((<Array<any>>data).length === 0){
          // This means the last page visited doesn't have plugins.
          // Which means that the 'load more' button must disappear.
          this.noMorePlugins = true;
          this.currentStatus = Status.OK;
          return;
        }

        // Union = concatenate and remove duplicates
        this.plugins = _.unionWith(this.plugins, <Array<any>>data, (a, b) => a.id === b.id);

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

  ngOnDestroy(){
    this.paramSubscription.unsubscribe();
  }


  ngOnInit() {
    this.paramSubscription = this.route.params.subscribe(params => {
      this.resetSearch();

      if(params.hasOwnProperty('categorySlug') && typeof params.categorySlug === 'string'){
        this.categorySlug = params.categorySlug;
      } else {
        this.categorySlug = null;
      }

      this.searchParamsService.updateCategorySlug(this.categorySlug);

      this.fetchPlugins();
    });
  }

}
