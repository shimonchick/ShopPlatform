import {MapsLocation} from './location';
import {FormlyFieldConfig} from '@ngx-formly/core';

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
    fields:  FormlyFieldConfig[];
}

