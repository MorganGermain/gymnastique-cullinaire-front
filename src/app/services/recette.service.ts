import { Injectable } from '@angular/core';
import { Recette } from '../models/recette';
import { QuantiteIngredient } from '../models/quantite';
import { Ingredient } from '../models/ingredient';
import { Unite } from '../models/unite';
import { RecetteList } from '../models/recetteList';
import { Time } from './../models/time';
import { Etape } from '../models/etape';
import * as cloneDeep from 'lodash/cloneDeep';
import { ApiService } from './api.service';
import { Subject, Observable } from 'rxjs';
import { ApiRecette } from '../models/api-recette';

@Injectable({
    providedIn: 'root',
})
export class RecetteService {

    // private recettes: Recette[] = [
    //     new Recette({
    //         Id: 1,
    //         Nom: 'salade simple',
    //         Description: 'C\'est une salade plutôt simple transmise de génération en génération. Perso, je ne l\'aime même pas.',
    //         DureePreparation: new Time(30),
    //         DureeCuisson: new Time(45),
    //         DateAjout: new Date(Date.now()),
    //         Ingredients: [
    //             new QuantiteIngredient({
    //                 IdRecette: 1,
    //                 Ingredient: new Ingredient({
    //                     Id: 1,
    //                     Nom: 'Salade',
    //                 }),
    //                 Quantite: 1,
    //                 Unite: new Unite({
    //                     Id: 1,
    //                     Nom: 'unité',
    //                     Abreviation: '',
    //                 }),
    //             }),
    //         ],
    //         NombreDePersonne: 2,
    //         Etapes: [
    //             new Etape({
    //                 Id: 1,
    //                 Order: 1,
    //                 Valeur: 'Met la salade dans le saladier.',
    //             }),
    //             new Etape({
    //                 Id: 2,
    //                 Order: 2,
    //                 Valeur: 'Mellange la salade.',
    //             }),
    //         ],
    //     }),
    // ];

    public recettesReceived: Subject<boolean> = new Subject<boolean>();
    private recettes: Recette[] = [];

    public get Recettes() {
        return cloneDeep(this.recettes);
    }

    public get RecettesList(): RecetteList[] {
        return this.Recettes.map(recette => recette.toRecetteList());
    }


    constructor(public apiService: ApiService) {
        this.apiService.getRecettes().subscribe((recettes) => {
            this.recettes = recettes.map((r) => this.apiReceipToRecette(r));
            this.recettesReceived.next(true);
        }, (error) => {
            console.error(error);
        });
    }

    public getRecette(id: number): Recette {
        return this.Recettes.find(recette => recette.Id === id);
    }

    public searchRecettes(search: string): RecetteList[] {
        return this.RecettesList.filter(recette => recette.Nom.includes(search));
    }

    public downloadFile(blob: any) {
        console.log(blob)
        var newBlob = new Blob(blob.data, { type: "application/pdf" })

        console.log(newBlob)
        // IE doesn't allow using a blob object directly as link href
        // instead it is necessary to use msSaveOrOpenBlob
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveOrOpenBlob(newBlob);
            return;
        }

        // For other browsers: 
        // Create a link pointing to the ObjectURL containing the blob.
        const data = window.URL.createObjectURL(newBlob);
        var link = document.createElement('a');
        link.href = data;
        link.download = "file.pdf";
        link.click();
        setTimeout(function () {
            // For Firefox it is necessary to delay revoking the ObjectURL
            window.URL.revokeObjectURL(data);
        }, 100);
    }

    public addRecette(recette: Recette): Recette {
        this.recettes.push(new Recette(recette));
        return recette;
    }

    public updateRecette(recette: Recette): Recette {
        const indexRecette: number = this.recettes.findIndex(r => r.Id === recette.Id);

        if (indexRecette !== -1) {
            this.recettes[indexRecette] = new Recette(recette);
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

    public getPdf(ids: number[]): Observable<any> {
        return this.apiService.getPdf({ ids });
    }

    public apiReceipToRecette(recetteApi: ApiRecette): Recette {
        return new Recette({
            Id: recetteApi.id,
            Nom: recetteApi.name,
            Description: recetteApi.description,
            DureePreparation: new Time(recetteApi.preparation_time),
            DureeCuisson: new Time(recetteApi.cooking_time),
            NombreDePersonne: recetteApi.nb_people,
            Etapes: recetteApi.steps.map(step => new Etape({
                Id: step.id,
                Valeur: step.description,
                Order: step.order,
            })),
            Ingredients: recetteApi.ingredients.map(ing => new QuantiteIngredient({
                IdRecette: recetteApi.id,
                Ingredient: new Ingredient({
                    Id: ing.id,
                    Nom: ing.name,
                }),
                Quantite: ing.quantity,
                Unite: new Unite({
                    Nom: ing.unit,
                }),
            })),
        });
    }

    public recetteToApiReceip(recette: Recette): ApiRecette {
        return {
            id: recette.Id,
            name: recette.Nom,
            description: recette.Description,
            preparation_time: recette.DureePreparation.getTimeToMinutes(),
            cooking_time: recette.DureeCuisson.getTimeToMinutes(),
            creation_date: new Date(Date.now()),
            nb_people: recette.NombreDePersonne,
            steps: recette.Etapes.map(step => ({
                id: step.Id,
                description: step.Valeur,
                order: step.Order,
            })),
            ingredients: recette.Ingredients.map(ing => ({
                id: ing.Ingredient.Id,
                name: ing.Ingredient.Nom,
                quantity: ing.Quantite,
                unit: ing.Unite.Nom,
            })),
        };
    }

}
