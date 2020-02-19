import { Time } from './time';

export class RecetteList {

    public constructor(init?: Partial<RecetteList>) {
        Object.assign(this, init);
    }

    public Id: number;
    public Nom: string;
    public Duree: Time;
}
