import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { SearchParamsService } from './search-params.service';
import { Subscription } from 'rxjs/Subscription';
import * as _ from "lodash";

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.css'],
  providers: [SearchParamsService]
})
export class ExploreComponent implements OnInit {

  constructor(private categoryService: CategoryService, private searchParamsService: SearchParamsService, private changeDetectorRef: ChangeDetectorRef) {
  }

  categories: any[] = [];

  currentCategory: string;

  private paramSubscription: Subscription;

  fetchCategories(){
    this.categoryService.getCategories()
    .subscribe(
      data => {
        this.categories = <Array<any>>data;
      },
    );
  }


  ngOnDestroy(){
    this.paramSubscription.unsubscribe();
  }

  ngOnInit() {

    this.fetchCategories();

    this.paramSubscription = this.searchParamsService.categorySlug$.subscribe(
      slug => {
        this.currentCategory = slug;

        // This line avoids this problem:
        // https://stackoverflow.com/questions/34364880/expression-has-changed-after-it-was-checked
        this.changeDetectorRef.detectChanges();
      });

  }

}
