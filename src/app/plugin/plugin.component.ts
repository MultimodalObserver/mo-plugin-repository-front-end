import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { PluginService } from '../../services/plugin.service';
import { UrlService } from '../../services/url.service';

@Component({
  selector: 'app-plugin',
  templateUrl: './plugin.component.html'
})
export class PluginComponent implements OnInit {

  private sub: any;
  private pluginSlug: string;
  plugin = null;
  loading = false;

  constructor(private route: ActivatedRoute, private pluginService: PluginService, private urlService: UrlService) { }

  ngOnInit() {

    this.loading = true;
    this.sub = this.route.params.subscribe(params => {
       this.pluginSlug = params['pluginSlug'];

       this.pluginService.showPlugin(this.pluginSlug).subscribe(

        data => {
          console.log(data)
          this.plugin = data;
          this.loading = false;
       }, err => {
         this.plugin = null;
         this.loading = false;
       });
    });


  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
