import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recent-comments',
  templateUrl: './recent-comments.component.html',
  styleUrls: ['./recent-comments.component.scss'],
  host: { class: 'container d-block' },
})
export class RecentCommentsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
