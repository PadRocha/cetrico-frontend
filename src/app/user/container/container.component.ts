import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'app/auth/services/user/user.service';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements OnInit {

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _user: UserService,
  ) {
  }

  ngOnInit(): void {
    this.paramMap();

  }

  paramMap(): void {
    this._route.firstChild.paramMap.subscribe(res => {
      if (res.has('user')) {

      }
    });
  }

  bookmarkedsIsDisabled(): boolean {
    return !this._router.url.endsWith('bookmarkeds');
  }

  settingsIsDisabled(): boolean {
    return !this._router.url.endsWith('settings');
  }
}
