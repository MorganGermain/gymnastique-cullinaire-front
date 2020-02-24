export interface ApiRecette {
    id: number;
    name: string;
    description: string;
    preparation_time: number;
    cooking_time: number;
    creation_date: Date;
    nb_people: number;
    steps: {
        id: number;
        description: string;
        order: number;
    }[];
    ingredients: {
        id: number;
        name: string;
        quantity: number;
        unit: string;
    }[];
}
