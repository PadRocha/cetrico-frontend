import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'widget-search',
  templateUrl: './widget-search.component.html',
  styleUrls: ['./widget-search.component.scss'],
  host: { 'class': 'widget d-block' },
})
export class WidgetSearchComponent implements OnInit {

  constructor(
    private _router: Router,
  ) { }

  ngOnInit(): void {
  }

  enterSearch({ target, key }: KeyboardEvent): void {
    if (key === 'Enter') {
      this._router.navigate(['/blog/search'], { queryParams: { title: (target as HTMLInputElement).value } });
    }
  }
}
