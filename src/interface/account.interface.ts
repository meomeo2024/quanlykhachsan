export interface IAccount {
    id: string;
    fullName: string;
    phone: string;
    role?: string;
    active?: boolean;
}

export enum RoleID {
    LT = "LT",
    QL = "QL",
    GD = "GD"
}

export interface IRole {
    id: string;
    name: string;
}