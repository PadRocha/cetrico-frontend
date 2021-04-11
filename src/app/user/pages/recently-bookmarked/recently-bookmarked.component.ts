import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recently-bookmarked',
  templateUrl: './recently-bookmarked.component.html',
  styleUrls: ['./recently-bookmarked.component.scss'],
  host: { class: 'container d-block' },
})
export class RecentlyBookmarkedComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
