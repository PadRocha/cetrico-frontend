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
  }

  userLogged(): boolean {
    return !this._user.logged;
  }

  logOut(): void {
    this._user.destroy();
    this._auth.logoutUser();
  }
}
