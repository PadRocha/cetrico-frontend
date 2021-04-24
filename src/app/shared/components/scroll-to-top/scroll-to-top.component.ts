import { ViewportScroller } from '@angular/common';
import { Component, HostBinding, HostListener } from '@angular/core';

@Component({
  selector: 'scroll-to-top',
  template: '^',
  styleUrls: ['./scroll-to-top.component.scss'],
})
export class ScrollToTopComponent {
  private toogle_ratio: number;
  @HostBinding('class.showBtn') showBtn: boolean;

  constructor(
    private _scroller: ViewportScroller,
  ) {
    this.toogle_ratio = 0.50;
    this.showBtn = false;
  }

  @HostListener('window:scroll', ['$event']) onScroll($event: Event): void {
    const document = ($event.target as HTMLDocument).documentElement;
    const scrollTotal = document.scrollHeight - document.clientHeight;
    this.showBtn = (document.scrollTop / scrollTotal) > this.toogle_ratio ?? false;
  }

  @HostListener('click') onClick(): void {
    this._scroller.scrollToPosition([0, 0]);
  }
}
