import { Injectable } from '@angular/core';
import { Recette } from '../models/recette';
import { QuantiteIngredient } from '../models/quantite';
import { Ingredient } from '../models/ingredient';
import { Unite } from '../models/unite';
import { RecetteList } from '../models/recetteList';
import { Time } from './../models/time';

@Injectable({
  providedIn: 'root',
})
export class RecetteService {

    private recettes: Recette[] = [
        new Recette({
            Id: 1,
            Nom: 'salade simple',
            DureePreparation: new Time(30),
            DureeCuisson: new Time(45),
            DateAjout: new Date(Date.now()),
            Ingredients: [
                new QuantiteIngredient({
                    IdRecette: 1,
                    Ingredient: new Ingredient({
                        Id: 1,
                        Nom: 'Salade',
                    }),
                    Quantite: 1,
                    Unite: new Unite({
                        Id: 1,
                        Nom: 'unité',
                        Abreviation: '',
                    }),
                }),
            ],
            NombreDePersonne: 2,
        }),
    ];

    public get Recettes() {
        return [...this.recettes];
    }

    public get RecettesList(): RecetteList[]{
        return this.Recettes.map(recette => recette.toRecetteList());
    }


    constructor() { }

    public getRecette(id: number): Recette {
        return this.Recettes.find(recette => recette.Id === id);
    }

    public searchRecettes(search: string): RecetteList[] {
        return this.RecettesList.filter(recette => recette.Nom.includes(search));
    }

    public addRecette(recette: Recette): Recette {
        this.recettes.push(recette);
        return recette;
    }

    public updateRecette(recette: Recette): Recette {
        const indexRecette: number = this.recettes.findIndex(r => r.Id === recette.Id);

        if (indexRecette !== -1) {
            this.recettes[indexRecette] = recette;
            return recette;
        } else {
            return null;
        }
    }

    public deleteRecette(idRecette: number): boolean {
        const indexRecette = this.recettes.findIndex(recette => recette.Id === idRecette);

        if (indexRecette !== -1) {
            this.recettes.splice(indexRecette, 1);
            return true;
        }
        return false;
    }

}
