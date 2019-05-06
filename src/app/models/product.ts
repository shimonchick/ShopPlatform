import {MapsLocation} from './location';

export class Product {
    sellerUid: string;
    name: string;
    description: string;
    price: number;
    id: string;
    urls: string[];
    coordinates: MapsLocation;
    priority: number;
}
