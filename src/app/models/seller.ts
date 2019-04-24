import {Buyer} from './buyer';

export interface Seller extends Buyer {
    company: string | null;
}
