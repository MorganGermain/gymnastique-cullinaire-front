import { Unite } from './unite';
import { Ingredient } from './ingredient';

export class QuantiteIngredient {

    public constructor(init?: Partial<QuantiteIngredient>) {
        Object.assign(this, init);
    }

    public IdRecette: number;
    public Ingredient: Ingredient;
    public Quantite: number;
    public Unite: Unite;
}
