import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RecetteListComponent } from './recette/list/recette-list.component';
import { RecetteEditComponent } from './recette/edit/recette-edit.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'dashboard',
      component: DashboardComponent,
    },
    {
      path: 'recettes',
      children: [
        {
          path: ':id',
          component: RecetteEditComponent,
        },
        {
          path: 'add',
          component: RecetteEditComponent,
        },
        {
          path: '',
          component: RecetteListComponent,
        },
      ],
    },
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
