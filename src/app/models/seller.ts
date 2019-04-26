import {User} from './user';
import {MapsLocation} from './location';

export interface Seller extends User {
    coordinates: MapsLocation;
    address: string;
    phoneNumber: string;
    firstName: string;
    lastName: string;
}
