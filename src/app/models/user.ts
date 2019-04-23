export interface Roles {
    buyer?: boolean;
    seller?: boolean;
    admin?: boolean;
}

export interface User {
    uid: string;
    email: string;
    photoURL: string;
    displayName: string;
    roles: Roles;
}

//todo move everything into seller class

interface Coordinates {
    lat: number;
    lon: number;
}
