import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { IComment } from '@shared/models/comment';

@Injectable({
  providedIn: 'root'
})
export class ShippingService {
  private url: string;
  private headersJSON: HttpHeaders;

  constructor(
    private _http: HttpClient,
  ) {
    this.url = environment.httpUrl;
    this.headersJSON = new HttpHeaders().set("Content-Type", "application/json");
  }

  sendComment(comment: IComment) {
    const params = JSON.stringify(comment);
    return this._http.post<{ data: IComment }>(`${this.url}/comment`, params, { headers: this.headersJSON });
  }

  sendMail(mail: { name: string; email: string; content: string; }) {
    const params = JSON.stringify(mail);
    return this._http.post<{ message: string }>(`${this.url}/send-email`, params, { headers: this.headersJSON });
  }
}
