export class Unite {

    public constructor(init?: Partial<Unite>) {
        Object.assign(this, init);
    }

    public Id: number;
    public Nom: string;
    public Abreviation: string;
}
