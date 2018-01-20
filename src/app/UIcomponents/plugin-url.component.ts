import { Component, Input } from '@angular/core';
import { environment } from '../../environments/environment';

@Component({
  template: `
  <input type="text" class="form-control" value='{{ pluginUrl() }}' readonly onclick="this.select();"/>
  `,
  selector: 'plugin-url'
})
export class PluginUrlComponent {
  @Input() shortName: string;

  public pluginUrl() : string{
    return environment.apiBase + "/plugins/" + this.shortName;
  }

}
