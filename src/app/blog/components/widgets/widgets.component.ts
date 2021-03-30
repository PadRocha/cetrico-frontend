import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'widgets',
  templateUrl: './widgets.component.html',
  styleUrls: ['./widgets.component.scss'],
  host: { 'class': 'col-lg-4' },
})
export class WidgetsComponent implements OnInit {

  constructor(
    private _router: Router,
  ) { }

  ngOnInit() {
  }

  isSearchEnabled(): boolean {
    return this._router.url.endsWith('search');
  }

  enterSearch({ target, key }: KeyboardEvent): void {
    if (key === 'Enter') {
      this._router.navigate(['/blog/search'], { queryParams: { title: (target as HTMLInputElement).value } });
    }
  }
}