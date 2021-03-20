import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private avoidUrls: string[];

  constructor(
    private _router: Router
  ) {
    this.avoidUrls = [
      '/blog/home',
      '/terms-of-use',
      '/auth',
      '/config',
    ];
  }

  isEnabled(): boolean {
    return this.avoidUrls.some(url => this._router.url.startsWith(url));
  }
}
