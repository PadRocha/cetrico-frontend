import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements OnInit {

  constructor(
    private _router: Router,
  ) {
  }

  ngOnInit(): void {
  }

  bookmarkedsIsDisabled(): boolean {
    return !this._router.url.endsWith('bookmarkeds');
  }

  settingsIsDisabled(): boolean {
    return !this._router.url.endsWith('settings');
  }
}
