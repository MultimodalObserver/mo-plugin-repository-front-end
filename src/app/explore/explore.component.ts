import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { TagService } from '../../services/tag.service';
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

  constructor(private tagService: TagService, private searchParamsService: SearchParamsService, private changeDetectorRef: ChangeDetectorRef) {
  }

  tags1: any[] = [];

  tags2: any[] = [];

  currentTag: string;

  private paramSubscription: Subscription;

  fetchTags(){
    this.tagService.getTags()
    .subscribe(
      data => {
        const c = <Array<any>>data;


        // Partition array
        if(c.length > 4){
          this.tags2 = c;
          this.tags1 = this.tags2.splice(Math.floor(c.length/2));
        } else {
          this.tags1 = c;
        }
      },
    );
  }


  ngOnDestroy(){
    this.paramSubscription.unsubscribe();
  }

  ngOnInit() {

    this.fetchTags();

    this.paramSubscription = this.searchParamsService.tagSlug$.subscribe(
      slug => {
        this.currentTag = slug;

        // This line avoids this problem:
        // https://stackoverflow.com/questions/34364880/expression-has-changed-after-it-was-checked
        this.changeDetectorRef.detectChanges();
      });

  }

}
