export interface Category {
    id: number;
    name: string;
}

export interface ICategoryForm extends Omit<Category> {
    id?: number | undefined; // on prévoir l'édition => surcharge de "id", lors de la création l'id n'est pas défini
    name: string;
}