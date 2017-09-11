import { Component } from '@angular/core';

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

  isCollapsed: boolean = true;

  title = 'app';
  
}
