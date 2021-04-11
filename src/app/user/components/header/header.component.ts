import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'user-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  user: string;

  constructor(
    private _route: ActivatedRoute,
  ) {
    this.user = '';
  }

  ngOnInit(): void {
    this._route.firstChild.paramMap.subscribe(res => {
      this.user = res.get('user');
    })
  }
}
