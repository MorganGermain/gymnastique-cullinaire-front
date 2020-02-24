import { Component, OnInit, OnDestroy } from '@angular/core';
import { RecetteService } from '../../services/recette.service';
import { RecetteList } from '../../models/recetteList';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'ngx-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit, OnDestroy {

  public recettesList: RecetteList[];
  private recetteSub: Subscription;

  constructor(private recetteService: RecetteService) {}

  ngOnInit(): void {
    this.recettesList = this.recetteService.RecettesList;
    this.recetteSub = this.recetteService.recettesReceived.subscribe(() => this.recettesList = this.recetteService.RecettesList );
  }

  ngOnDestroy(): void {
    this.recetteSub.unsubscribe();
  }
}
