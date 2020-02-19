import { Component, OnInit } from '@angular/core';
import { RecetteService } from '../../services/recette.service';
import { RecetteList } from '../../models/recetteList';

@Component({
  selector: 'ngx-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  public recettesList: RecetteList[];

  constructor(private recetteService: RecetteService) {}

  public ngOnInit(): void {
    this.recettesList = this.recetteService.RecettesList;
  }
}
