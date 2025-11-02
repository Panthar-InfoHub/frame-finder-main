export interface IUser {
    _id?: string;
    first_name?: string;
    last_name?: string;
    img?: {
        url?: string;
    };
    phone?: string;
    email?: string;
    gender?: 'male' | 'female' | 'others';


    wallet_point?: number;
    prescription?: any;

    address?: Address[]

    isActive?: boolean;
    role?: 'USER' | 'ADMIN' | 'SUPER_ADMIN' | string;

    createdAt?: string | Date;
    updatedAt?: string | Date;
}

export interface Address {
    _id: string
    address_line_1: string
    city: string
    state: string
    pincode: string
}