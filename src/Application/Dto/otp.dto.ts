export interface Otp {
    id?: string | null;
    name: string;
    email: string;
    mobile: string;
    password: string;
    otp: string;
    createdAt?: Date;
}

