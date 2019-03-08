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
    phoneNumber: string;
    roles: Roles;
}
