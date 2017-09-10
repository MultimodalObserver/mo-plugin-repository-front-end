import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { SearchParamsService } from './search-params.service';
import { Subscription } from 'rxjs/Subscription';
import * as _ from 'lodash';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss'],
  providers: [SearchParamsService]
})
export class ExploreComponent implements OnInit {

  constructor(private categoryService: CategoryService, private searchParamsService: SearchParamsService, private changeDetectorRef: ChangeDetectorRef) {
  }

  categories1: any[] = [];

  categories2: any[] = [];

  currentCategory: string;

  private paramSubscription: Subscription;

  fetchCategories(){
    this.categoryService.getCategories()
    .subscribe(
      data => {
        const c = <Array<any>>data;


        // Partition array
        if(c.length > 4){
          this.categories2 = c;
          this.categories1 = this.categories2.splice(Math.floor(c.length/2));
        } else {
          this.categories1 = c;
        }
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
