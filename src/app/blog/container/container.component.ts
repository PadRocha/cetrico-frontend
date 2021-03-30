import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent {
  private avoidUrls: string[]
  constructor(
    private _router: Router,
  ) {
    this.avoidUrls = [
      'home'
    ];
  }

  isEnabled(): boolean {
    return this.avoidUrls.some(url => this._router.url.endsWith(url));
  }
}
