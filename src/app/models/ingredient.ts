export class Ingredient {

    public constructor(init?: Partial<Ingredient>) {
        Object.assign(this, init);
    }

    public Id: number;
    public Nom: string;
}
