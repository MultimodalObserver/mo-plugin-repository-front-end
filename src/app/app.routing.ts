import { RouterModule, Routes } from '@angular/router';

import { ExploreComponent } from './explore/explore.component';
import { HomeComponent } from './home/home.component';
import { PluginComponent } from './plugin/plugin.component';
import { AccountComponent } from './account/account.component';
import { PublishComponent } from './publish/publish.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { Angular2TokenService } from 'angular2-token';
import { NormalUserGuard } from "./guards/normal-user.guard";
import { AdminGuard } from "./guards/admin.guard";

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'explore', component: ExploreComponent },
  { path: 'account', component: AccountComponent, canActivate: [NormalUserGuard] },
  { path: 'plugin/:pluginSlug', component: PluginComponent },
  { path: 'publish', component: PublishComponent, canActivate: [NormalUserGuard] },
  { path: '**', component: PageNotFoundComponent }
];

export const AppRouting = RouterModule.forRoot(routes);
