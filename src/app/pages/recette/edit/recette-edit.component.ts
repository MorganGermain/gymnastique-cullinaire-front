import { Component, OnInit, OnDestroy } from '@angular/core';
import { RecetteService } from '../../../services/recette.service';
import { ActivatedRoute } from '@angular/router';
import { Recette } from '../../../models/recette';
import { Observable, Subscription } from 'rxjs';
import { QuantiteIngredient } from '../../../models/quantite';
import { Ingredient } from '../../../models/ingredient';
import { Unite } from '../../../models/unite';
import { Etape } from '../../../models/etape';
import * as cloneDeep from 'lodash/cloneDeep';

@Component({
  selector: 'ngx-recette-edit',
  templateUrl: './recette-edit.component.html',
  styleUrls: ['./recette-edit.component.scss'],
})
export class RecetteEditComponent implements OnInit, OnDestroy {
  private idRecette: number;
  public recette: Recette;
  private sub: Subscription;
  private isEditMode: boolean = false;
  private isCreation: boolean = false;
  private recetteEdit: Recette;
  private recetteSub: Subscription;

  constructor(
    private recetteService: RecetteService,
    private route: ActivatedRoute,
  ) {
    this.sub = this.route.params.subscribe(params => {
      this.idRecette = +params['id'];

      if (isNaN(this.idRecette)) {
        this.recette = new Recette();
        this.isCreation = true;
        this.setEditMode();
      } else {
        this.recette = this.recetteService.getRecette(this.idRecette);
      }
    });
  }

  public setEditMode(): void {
    this.isEditMode = true;
    this.recetteEdit = cloneDeep(this.recette);
  }

  public setReadMode(): void {
    this.isEditMode = false;
  }

  public save(): void {
    this.recette = this.recetteEdit;
    if (this.isCreation) {
      this.recetteService.addRecette(this.recette);
      this.isCreation = false;
    } else {
      this.recetteService.updateRecette(this.recette);
    }
    this.setReadMode();
  }

  ngOnInit() {
    this.recetteSub = this.recetteService.recettesReceived.subscribe(() => {
      if (!this.isCreation) {
        this.recette = this.recetteService.getRecette(this.idRecette);
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    this.recetteSub.unsubscribe();
  }

  public removeIngredient(index: number): void {
    this.recetteEdit.Ingredients.splice(index, 1);
  }

  public addIngredient(): void {
    this.recetteEdit.Ingredients.push(new QuantiteIngredient({
      IdRecette: this.recetteEdit.Id,
      Ingredient: new Ingredient(),
      Unite: new Unite(),
    }));
  }

  public changeEtapeOrderUp(currentOrder: number, goUp: boolean): void {
    const etapeIndex = this.recetteEdit.Etapes.findIndex(etape => etape.Order === currentOrder);
    if (etapeIndex !== -1) {
      if (goUp) {
        this.recetteEdit.Etapes.find(e => e.Order === (this.recetteEdit.Etapes[etapeIndex].Order - 1)).Order++;
        this.recetteEdit.Etapes[etapeIndex].Order--;
      } else {
        this.recetteEdit.Etapes.find(e => e.Order === (this.recetteEdit.Etapes[etapeIndex].Order + 1)).Order--;
        this.recetteEdit.Etapes[etapeIndex].Order++;
      }
      this.recetteEdit.Etapes.sort((a, b) => a.Order - b.Order);
    }
  }

  public removeEtape(index: number): void {
    const etapeOrder = this.recetteEdit.Etapes[index].Order;
    this.recetteEdit.Etapes.forEach(e => {
      if (e.Order > etapeOrder) {
        e.Order--;
      }
    });
    this.recetteEdit.Etapes.splice(index, 1);
  }

  public addEtape(): void {
    this.recetteEdit.Etapes.push(new Etape({ Order: this.recetteEdit.Etapes.length + 1 }));
  }
}
