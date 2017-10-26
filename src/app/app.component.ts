import { Component } from '@angular/core';
import { Angular2TokenService } from "angular2-token";
import { UrlService } from "../services/url.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  onExpanded(event): void {

  }

  onCollapsed(event): void {

  }

  constructor(private authToken: Angular2TokenService, private urlService: UrlService){
    this.authToken.init(this.urlService.baseUrl);
  }

  isCollapsed: boolean = true;

  title = 'app';

}
