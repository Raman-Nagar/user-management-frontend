
export type Role = "user" | "admin";

export interface UserType {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    role: Role;
    isVerified: boolean;
    avatar?: string;
    phone?: string;
    bio?: string;
    createdAt?: string;
    updatedAt?: string
}


export interface UserStateType {
    [key: string]: number
}