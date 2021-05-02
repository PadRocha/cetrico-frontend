export interface ICategory {
    readonly _id: string;
    readonly name: string;
    readonly totalPosts: number;
    readonly createdAt: Date;
    readonly updatedAt: Date;
}

/*------------------------------------------------------------------*/
// Modelo de image.ts
/*------------------------------------------------------------------*/

export class Category {
    constructor(
        public id: string,
        public name: string,
        public createdAt: Date,
    ) { }

    // remove
}
