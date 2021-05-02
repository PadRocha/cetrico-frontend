import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { IPost } from '@shared/models/post';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExtraPostsService {
  private url: String;
  private postChange$: BehaviorSubject<IPost[]>;

  constructor(
    private _http: HttpClient,
  ) {
    this.url = environment.httpUrl;
    this.postChange$ = new BehaviorSubject(new Array<IPost>())

    this.getRandomPosts();
  }

  getRandomPosts() {
    this._http
      .get<{ data: IPost[] }>(`${this.url}/random/post`)
      .subscribe(({ data }) => this.postChange$.next(data), () => this.postChange$.next(new Array<IPost>()));
  }

  getRelatedPosts(_id: string, params: { user?: string }) {
    this._http
      .get<{ data: IPost[] }>(`${this.url}/post/${_id}/related`, { params, withCredentials: false })
      .subscribe(({ data }) => this.postChange$.next(data), () => this.postChange$.next(new Array<IPost>()));
  }

  get getPosts() {
    return this.postChange$;
  }
}
