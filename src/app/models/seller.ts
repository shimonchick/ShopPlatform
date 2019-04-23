import {User} from './user';

export interface Seller extends User {
    company: string | null;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    address: string;
    coordinates: Coordinates;
}
