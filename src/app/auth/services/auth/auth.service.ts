import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { environment } from '@environments/environment';
import { IUser } from '../../models/user';

declare const FB: any;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url: String;
  private headersJSON: HttpHeaders

  constructor(
    private _http: HttpClient,
    private _router: Router,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {
    this.url = environment.httpUrl;
    this.headersJSON = new HttpHeaders().set('Content-Type', 'application/json');
  }

  setToken(value: string, expiry = true): void {
    const now = new Date();
    // `item` is an object which contains the original value
    // as well as the time when it's supposed to expire
    const item = { value, expiry: expiry ? now.getTime() + 86_400_000 : false, }
    if (isPlatformBrowser(this.platformId))
      localStorage.setItem('token', JSON.stringify(item));
  }

  loginUser(user: IUser) {
    const params = JSON.stringify(user);
    return this._http.post<{ token: string }>(`${this.url}/login`, params, { headers: this.headersJSON });
  }

  logoutUser(): void {
    if (isPlatformBrowser(this.platformId))
      localStorage.removeItem('token')

    this._router.navigate(['/auth/login']);
  }

  getToken(): string {
    const token = isPlatformBrowser(this.platformId) ? localStorage.getItem('token') : null;
    if (!token)
      return null;

    const { expiry, value } = JSON.parse(token);
    const now = new Date();
    if (!!expiry && now.getTime() > expiry) {
      this.logoutUser();
      return null;
    }

    return value ?? null;
  }

  loggedIn(): boolean {
    return isPlatformBrowser(this.platformId) ? !!localStorage.getItem('token') : false;
  }
}
