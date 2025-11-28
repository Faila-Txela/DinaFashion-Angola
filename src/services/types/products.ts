export type Products = {
    id: string;
    name: string;
    description: string;
    price: number;
    image?: string[]
    inStock: number;
    active: boolean;
    createdAt?: Date;
    updatedAt?: string;
}
