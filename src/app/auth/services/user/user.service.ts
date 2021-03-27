import { HttpClient } from '@angular/common/http';
import { Injectable, } from '@angular/core';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { environment } from '@environments/environment';

interface userIdentity {
  identifier: string;
  nickname: string;
  roles: string[];
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url: String;
  private user: userIdentity;
  private data$: Observable<userIdentity>

  constructor(
    private _http: HttpClient,
  ) {
    this.url = environment.httpUrl;
    this.user = {
      identifier: null,
      nickname: null,
      roles: new Array<string>(),
    }
    this.data$ = this._http.get<userIdentity>(`${this.url}/user`).pipe(shareReplay(1));
  }

  get(): Observable<userIdentity> {
    return this.data$;
  }

  set(user: userIdentity): void {
    this.user = user;
  }

  setted(): boolean {
    return !!this.user.identifier;
  }

  getRoles(): string[] {
    return this.user.roles;
  }

  getNickname(): string {
    return this.user.nickname;
  }

  getId(): string {
    return this.user.identifier;
  }

  isEqualTo(nickname: string): boolean {
    return this.user.nickname === nickname;
  }

  hasRole(role: string | string[]): boolean {
    return Array.isArray(role)
      ? role.some(r => this.user.roles.includes(r))
      : this.user.roles.includes(role);
  }
}
