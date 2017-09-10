import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';


@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.css']
})
export class ExploreComponent implements OnInit {

  constructor(private categoryService: CategoryService) {
  }

  categories: any[] = [];

  fetchCategories(){
    this.categoryService.getCategories()
    .subscribe(
      data => {
        this.categories = <Array<any>>data;
      },
    );
  }

  ngOnInit() {
    this.fetchCategories();
  }

}
