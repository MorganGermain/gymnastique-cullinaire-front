export class Etape {

    public constructor(init?: Partial<Etape>) {
        Object.assign(this, init);
    }

    public Id: number;
    public Order: number;
    public Valeur: string;
}
