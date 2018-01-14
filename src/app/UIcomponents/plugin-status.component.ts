import { Component, Input } from '@angular/core';

@Component({
  template: `
  <div class="tag accepted-plugin" *ngIf="plugin.status == 'confirmed'">
    <i class="fa fa-globe"></i> Public
  </div><div class="tag pending-plugin" *ngIf="plugin.status == 'pending'">
    <i class="fa fa-warning"></i> Pending moderation
  </div><div class="tag rejected-plugin" *ngIf="plugin.status == 'rejected'">
    <i class="fa fa-times"></i> Rejected</div>`,
  selector: 'plugin-status',
    styleUrls: ['./ui-components.scss']
})
export class PluginStatusComponent {
  @Input() plugin: any;
}
