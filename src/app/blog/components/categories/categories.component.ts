import { Component, OnInit } from '@angular/core';
import { ICategory } from '@shared/models/category';
import { ArrivalsService } from 'app/blog/services/arrivals/arrivals.service';

@Component({
  selector: 'widget-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
  host: { 'class': 'widget d-block' },
})
export class CategoriesComponent implements OnInit {
  categories: ICategory[];
  categoryIsLoading: boolean;
  categoryPage: number;
  categoryHasNextPage: boolean;

  constructor(
    private _arrivals: ArrivalsService,
  ) {
    this.categories = new Array<ICategory>();
    this.categoryIsLoading = true;
    this.categoryPage = 1;
    this.categoryHasNextPage = false;
  }

  ngOnInit(): void {
    this.listCategories();
  }

  private listCategories(): void {
    this.categoryIsLoading = false;
    this._arrivals.listCategoryPage(this.categoryPage).subscribe(res => {
      this.categories = this.categories.concat(res.data);
      this.categoryHasNextPage = res.hasNextPage;
      this.categoryIsLoading = true;
    });
  }

  addCategory(): void {
    if (this.categoryIsLoading) {
      ++this.categoryPage;
      this.listCategories();
    }
  }
}
