import { Component, OnInit, OnDestroy } from '@angular/core';
import { RecetteService } from '../../../services/recette.service';
import { RecetteList } from '../../../models/recetteList';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ngx-recette-list',
  templateUrl: './recette-list.component.html',
  styleUrls: ['./recette-list.component.scss'],
})
export class RecetteListComponent implements OnInit, OnDestroy {

  public recettesList: RecetteList[] = [];
  private recetteSub: Subscription;

  public getSelectedRecettesList(): RecetteList[] {
    return this.recettesList.filter(recette => recette.Selected);
  }

  public generatePdf(): void {
    const selectedIds = this.getSelectedRecettesList().map(recette => recette.Id);
    if (selectedIds.length > 0) {
      this.recetteService.getPdf(selectedIds).subscribe((any) => {
        this.recetteService.downloadFile(any.pdf); 
      })
    }
  }

  constructor(
    public recetteService: RecetteService,
    ) { }

  ngOnInit() {
    this.recettesList = this.recetteService.RecettesList;
    this.recetteSub = this.recetteService.recettesReceived.subscribe(() => this.recettesList = this.recetteService.RecettesList );

  }

  public search(search: string): void {
    this.recettesList = this.recetteService.searchRecettes(search);
  }

  ngOnDestroy(): void {
    this.recetteSub.unsubscribe();
  }

}
