import { HttpClient } from '@angular/common/http';
import { Injectable, } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { AuthService } from '../auth/auth.service';

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
  private data$: Observable<userIdentity>
  private userChange$: BehaviorSubject<userIdentity>;

  constructor(
    private _http: HttpClient,
    private _auth: AuthService,
  ) {
    this.url = environment.httpUrl;
    this.data$ = this._http.get<userIdentity>(`${this.url}/user`);
    this.userChange$ = new BehaviorSubject({
      identifier: null,
      nickname: null,
      roles: new Array<string>(),
    });

    if (this._auth.loggedIn()) this.update();
  }

  update(): void {
    this.data$.subscribe(user => this.userChange$.next(user), () => this.destroy());
  }

  destroy(): void {
    this.userChange$.next({
      identifier: null,
      nickname: null,
      roles: new Array<string>(),
    });
  }

  logged(): boolean {
    return !!this.userChange$.getValue().identifier;
  }

  getId(): string {
    return this.userChange$.getValue().identifier;
  }

  isEqualTo(_id: string): boolean {
    return this.userChange$.getValue().identifier === _id;
  }

  getNickname(): string {
    return this.userChange$.getValue().nickname;
  }

  getRoles(): string[] {
    return this.userChange$.getValue().roles;
  }

  hasRole(role: string | string[]): boolean {
    const currentRoles = this.userChange$.getValue().roles;
    return Array.isArray(role)
      ? role.some(r => currentRoles.includes(r))
      : currentRoles.includes(role);
  }
}
