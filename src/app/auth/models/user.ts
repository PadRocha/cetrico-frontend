'use strict'

import { IImage } from './image';

export interface IUser {
    readonly _id?: string;
    readonly nickname: string;
    readonly sub?: string;
    readonly image?: IImage;
    readonly password: string;
    readonly role?: string;
}

/*------------------------------------------------------------------*/
// Modelo de user.ts
/*------------------------------------------------------------------*/

export class User {
    constructor(
        public _id: string,
        public nickname: string,
        public password: string,
        public role: string
    ) { }
};