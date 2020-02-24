import { NgModule } from '@angular/core';
import { NbMenuModule, NbCardModule, NbIconModule, NbCheckboxModule } from '@nebular/theme';
import { ThemeModule } from '../../@theme/theme.module';
import { RecetteEditComponent } from './edit/recette-edit.component';
import { RecetteListComponent } from './list/recette-list.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    ThemeModule,
    NbCardModule,
    NbIconModule,
    RouterModule,
    FormsModule,
    NbCheckboxModule,
  ],
  declarations: [
    RecetteEditComponent,
    RecetteListComponent,
  ],
})
export class RecetteModule {
}
