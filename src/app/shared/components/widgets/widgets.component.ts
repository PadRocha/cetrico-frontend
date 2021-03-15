import { DOCUMENT, ViewportScroller } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICategory } from '@shared/models/category';
import { IPost } from '@shared/models/post';
import { ITag } from '@shared/models/tag';
import { ArrivalsService } from '@shared/services/arrivals/arrivals.service';

@Component({
  selector: 'widgets',
  templateUrl: './widgets.component.html',
  styleUrls: ['./widgets.component.scss'],
  host: { 'class': 'col-lg-4' },
})
export class WidgetsComponent implements OnInit {
  posts: IPost[];
  categories: ICategory[];
  categoryIsLoading: boolean;
  categoryPage: number;
  categoryHasNextPage: boolean;
  tags: ITag[];
  tagIsLoading: boolean;
  tagPage: number
  tagHasNextPage: boolean;

  constructor(
    private _router: Router,
    private _arrivals: ArrivalsService,
    private _scroller: ViewportScroller,
  ) {
    this.posts = new Array<IPost>();
    this.categories = new Array<ICategory>();
    this.categoryIsLoading = true;
    this.categoryPage = 1;
    this.categoryHasNextPage = true;
    this.tags = new Array<ITag>();
    this.tagIsLoading = true;
    this.tagPage = 1;
    this.tagHasNextPage = true;
  }

  ngOnInit() {
    this.listPosts();
    this.listCategories();
    this.listTags();
  }

  private listPosts(): void {
    this._arrivals.listPostViews().subscribe(({ data }) => this.posts = data);
  }

  private listCategories(): void {
    this.categoryIsLoading = false;
    this._arrivals.listCategoryPage(this.categoryPage).subscribe(res => {
      this.categories = this.categories.concat(res.data);
      this.categoryHasNextPage = res.hasNextPage;
      this.categoryIsLoading = true;
    });
  }

  private listTags(): void {
    this.tagIsLoading = false;
    this._arrivals.listTagPage(this.tagPage).subscribe(res => {
      this.tags = this.tags.concat(res.data);
      this.tagHasNextPage = res.hasNextPage;
      this.tagIsLoading = true;
    });
  }

  isSearchEnabled(): boolean {
    return this._router.url.startsWith('/blog/search');
  }

  enterSearch({ target, key }: KeyboardEvent): void {
    if (key === 'Enter') {
      this._router.navigate(['/blog/search'], {queryParams: { title: (target as HTMLInputElement).value }});
    }
  }

  addCategory(): void {
    if (this.categoryIsLoading) {
      ++this.categoryPage;
      this.listCategories();
    }
  }

  addTag(): void {
    if (this.tagIsLoading) {
      ++this.tagPage;
      this.listTags();
    }
  }
}