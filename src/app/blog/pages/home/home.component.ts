import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ArrivalsService } from '@shared/services/arrivals/arrivals.service';
import { MetaService } from 'app/blog/services/meta/meta.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private _meta: MetaService,
    private _arrival: ArrivalsService,
    private _scroller: ViewportScroller,
  ) { }

  ngOnInit(): void {
  }

  scroll(elem: HTMLSpanElement): void {
    this._scroller.scrollToPosition([0, elem.offsetTop + 130])
  }
}
