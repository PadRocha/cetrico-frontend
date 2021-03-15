import { ICategory } from './category';
import { IImage } from './image';
import { ITag } from './tag';
import { IUser } from './user';

export interface IPost {
    readonly _id: string;
    readonly title: string;
    readonly desc: string;
    readonly content: string;
    readonly image: IImage;
    readonly views: number;
    readonly countComments: number;
    readonly user: IUser;
    readonly category: ICategory;
    readonly tags: ITag[];
    readonly createdAt: string;
    readonly updatedAt: string;
}