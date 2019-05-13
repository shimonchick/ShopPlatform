import {MapsLocation} from './location';

export interface PreviewProduct {
    name: string;
    price: number;
    urls: string[];
}

export class Product implements PreviewProduct {
    sellerUid: string;
    description: string;
    id: string;
    coordinates: MapsLocation;
    priority: number;
    name: string;
    price: number;
    urls: string[];
}

export interface Category {
    name: string;
    subCategories: string[];
}

export interface CategoryTree {
    lvl0: string;
    lvl1: string;
}

