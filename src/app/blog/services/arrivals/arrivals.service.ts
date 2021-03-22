import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { ICategory } from '@shared/models/category';
import { IComment } from '@shared/models/comment';
import { DataPaginated } from '@shared/models/interfaces';
import { IPost } from '@shared/models/post';
import { ITag } from '@shared/models/tag';

@Injectable({
  providedIn: 'root'
})
export class ArrivalsService {
  private url: string;

  constructor(
    private _http: HttpClient,
  ) {
    this.url = environment.httpUrl;
  }

  listCategory() {
    return this._http.get<{ data: ICategory[] }>(`${this.url}/category`);
  }

  listTag() {
    return this._http.get<{ data: ITag[] }>(`${this.url}/tag`);
  }

  listPost(params?: { title?: string; tags?: string[]; category?: string; }) {
    return this._http.get<{ data: IPost[] }>(`${this.url}/post`, { params, withCredentials: false });
  }

  listPostPage(page: number, params?: { title?: string; tags?: string[]; category?: string; }) {
    return this._http.get<DataPaginated<IPost>>(`${this.url}/post/page/${page}`, { params, withCredentials: false });
  }

  getPost(title: string) {
    return this._http.get<{ data: IPost }>(`${this.url}/post/${title}`)
  }

  getPostPrevious(id: string) {
    return this._http.get<{ data: IPost | null }>(`${this.url}/post/${id}/previous`)
  }

  getPostNext(id: string) {
    return this._http.get<{ data: IPost | null }>(`${this.url}/post/${id}/next`)
  }

  getPostExists(id: string) {
    return this._http.get<{ data: boolean }>(`${this.url}/post/${id}/exists`)
  }

  listCommentPost(post: string, page: number) {
    return this._http.get<DataPaginated<IComment>>(`${this.url}/comment/${post}/page/${page}`);
  }

  getBookmark(post: string, user: string) {
    return this._http.get<{ data: { toogle: boolean; } }>(`${this.url}/bookmark/post/${post}/user/${user}`);
  }
}
