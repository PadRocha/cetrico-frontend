import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExchangeService {
  private url: string;
  private headersJSON: HttpHeaders;

  constructor(
    private _http: HttpClient,
  ) {
    this.url = environment.httpUrl;
    this.headersJSON = new HttpHeaders().set("Content-Type", "application/json");
  }

  updateBookmark(post: string, user: string, toogle: boolean) {
    const params = JSON.stringify({ toogle });
    return this._http.put<{ data: { toogle: boolean; } }>(`${this.url}/bookmark/post/${post}/user/${user}`, params, { headers: this.headersJSON });
  }
}
