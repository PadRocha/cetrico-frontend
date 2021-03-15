import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IPost } from '@shared/models/post';
import { ArrivalsService } from '../../services/arrivals/arrivals.service';
import { MetaService } from '../../services/meta/meta.service';

@Component({
  selector: 'app-anthology',
  templateUrl: './anthology.component.html',
  styleUrls: ['./anthology.component.scss'],
  host: { 'class': 'col-lg-8' },
})
export class AnthologyComponent implements OnInit {
  page: number;
  posts: IPost[];
  paginate: number[];
  paginateInfo: {
    page: number;
    nextPage: number;
    prevPage: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
    totalPages: number;
  };

  constructor(
    private _meta: MetaService,
    private _route: ActivatedRoute,
    private _arrival: ArrivalsService,
  ) {
    this.page = 0;
    this.posts = new Array<IPost>();
    this.paginateInfo = {
      page: null,
      nextPage: null,
      prevPage: null,
      hasNextPage: false,
      hasPrevPage: false,
      totalPages: null,
    }
    this.paginate = new Array<number>();
  }

  ngOnInit(): void {
    this._meta.updateTitle('Blog');
    this.paramsMap();
  }

  private paramsMap(): void {
    this._route.queryParamMap.subscribe(params => {
      this.page = +params.get('page') < 1 ? 1 : +params.get('page');
      this.listPosts();
    });
  }

  private listPosts(): void {
    this._arrival.listPostPage(this.page).subscribe(res => {
      this.posts = res.data;
      this.paginateInfo = {
        page: res.page,
        nextPage: res.nextPage,
        prevPage: res.prevPage,
        hasNextPage: res.hasNextPage,
        hasPrevPage: res.hasPrevPage,
        totalPages: res.totalPages,
      }
      this.paginate = this.paginateCalc();
    });
  }

  private paginateCalc(): number[] {
    const array = new Array<number>();
    const pages = 5;
    if (this.paginateInfo.page < pages && this.paginateInfo.totalPages > pages) {
      for (let i = 0; i < pages + 1; i++) {
        array.push(i);
      }
      return array;
    }
    array.push(this.paginateInfo.page);
    for (let i = 1; i < (pages / 2) + 1; i++) {
      let next = this.paginateInfo.page + i;
      let previous = this.paginateInfo.page - i;
      if (next < this.paginateInfo.totalPages + 1) array.push(next);
      if (previous > 0) array.push(previous);
    }
    return array.sort((a, b) => a - b)
  }
}
