export interface Category {
    name: string;
    subCategories: string[];
}

export interface CategoryTree {
    lvl0: string;
    lvl1: string;
}

export interface Product {
    sellerUid: string;
    name: string;
    description: string;
    price: number;
    id: string;
    urls: string[];
    coordinates: Location;
    categories: CategoryTree;
}
