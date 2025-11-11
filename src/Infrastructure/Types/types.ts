
export type Role = "user" | "agency" | "admin" | "hub" | "worker";



export interface AppJwtPayload {
    userId: string;
    email: string;
    role: Role;
}


export interface AuthUser {
    id: string;
    name: string;
    email: string;
    role: Role;
}

export interface TokenObj {
    accessToken: string;
    refreshToken: string;
    user?: AuthUser;
}
