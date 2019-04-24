import {User} from './user';
import {MapsLocation} from './location';

export interface Buyer extends User {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    coordinates: MapsLocation;
    address: string;
}
