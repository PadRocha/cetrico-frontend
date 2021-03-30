import { Component, OnInit } from '@angular/core';
import { IPost } from '@shared/models/post';
import { ArrivalsService } from 'app/blog/services/arrivals/arrivals.service';

@Component({
  selector: 'widget-latest-posts',
  templateUrl: './latest-posts.component.html',
  styleUrls: ['./latest-posts.component.scss'],
  host: { 'class': 'widget d-block' },
})
export class LatestPostsComponent implements OnInit {
  posts: IPost[];

  constructor(
    private _arrivals: ArrivalsService,
  ) { }

  ngOnInit() {
    this.listPosts();
  }

  private listPosts(): void {
    this._arrivals.listPostViews().subscribe(({ data }) => this.posts = data);
  }
}
