import { Time } from './time';
import { QuantiteIngredient } from './quantite';
import { RecetteList } from './recetteList';

export class Recette {

    public constructor(init?: Partial<Recette>) {
        Object.assign(this, init);
    }

    public Id: number;
    public Nom: string;
    public DureeCuisson: Time;
    public DureePreparation: Time;
    public DateAjout: Date;
    public Ingredients: QuantiteIngredient[];
    public NombreDePersonne: number;

    public toRecetteList(): RecetteList {
        const recetteList: RecetteList = new RecetteList({
            Id: this.Id,
            Nom: this.Nom,
            Duree: new Time(this.DureeCuisson.getTimeToMinutes() + this.DureePreparation.getTimeToMinutes()),
        });

        return recetteList;
    }
}
