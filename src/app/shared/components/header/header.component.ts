import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/auth/services/auth/auth.service';
import { UserService } from 'app/auth/services/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private _auth: AuthService,
    public _user: UserService,
  ) { }

  ngOnInit(): void {
    if (this._auth.loggedIn())
      this._user.get().subscribe(res => this._user.set(res), err => {

      });
  }

  userLogged(): boolean {
    return !this._auth.loggedIn();
  }

  logOut(): void {
    this._auth.logoutUser();
  }
}
