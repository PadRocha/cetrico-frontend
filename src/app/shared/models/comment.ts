import { IUser } from "app/auth/models/user";
import { IPost } from "./post";

export interface IComment {
    readonly _id: string;
    readonly content: string;
    readonly post: string;
    readonly user?: IUser;
    readonly email?: string;
    readonly nickname?: string;
    readonly createdAt?: Date;
    readonly updatedAt?: Date;
}

export class Comment {
    constructor(
        content: string,
        post: string,
        user?: string,
        email?: string,
        nickname?: string,
    ) { }
}