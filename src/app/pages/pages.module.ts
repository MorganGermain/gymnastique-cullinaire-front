import { NgModule } from '@angular/core';
import { NbMenuModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';
import { RecetteEditComponent } from './recette/edit/recette-edit.component';
import { RecetteListComponent } from './recette/list/recette-list.component';
import { RecetteModule } from './recette/recette.module';

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    DashboardModule,
    RecetteModule,
  ],
  declarations: [
    PagesComponent,
  ],
})
export class PagesModule {
}
