import { Component, OnInit } from '@angular/core';
import { IPost } from '@shared/models/post';
import { ExtraPostsService } from 'app/blog/services/extra-posts/extra-posts.service';

@Component({
  selector: 'widget-extra',
  templateUrl: './extra-posts.component.html',
  styleUrls: ['./extra-posts.component.scss'],
  host: { 'class': 'widget d-block sticky-lg-top' },
})
export class ExtraPostsComponent implements OnInit {
  posts: IPost[];

  constructor(
    private _extra: ExtraPostsService,
  ) { }

  ngOnInit() {
    this._extra.getPosts.subscribe(data => {
      this.posts = data;
    });
  }
}
