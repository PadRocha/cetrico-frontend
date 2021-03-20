import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ICategory } from '@shared/models/category';
import { IPost } from '@shared/models/post';
import { ITag } from '@shared/models/tag';
import { ArrivalsService } from 'app/blog/services/arrivals/arrivals.service';
import { MetaService } from 'app/blog/services/meta/meta.service';
import { FormValidator } from '@shared/validators/form-validator';
import { debounceTime, skip, take } from 'rxjs/operators';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  host: { 'class': 'col-lg-8' },
})
export class SearchComponent implements OnInit {
  tagArray: ITag[];
  tags: string[];
  optionalTags: string[];
  categoryArray: ICategory[];
  titleForm: FormControl;
  categoryForm: FormControl;
  posts: IPost[];

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _meta: MetaService,
    private _arrivals: ArrivalsService,
  ) {
    this.tagArray = new Array<ITag>();
    this.tags = new Array<string>();
    this.optionalTags = new Array<string>();
    this.categoryArray = new Array<ICategory>();
    this.titleForm = new FormControl({ value: '', disabled: true }, [Validators.required]);
    this.categoryForm = new FormControl({ value: '', disabled: true }, [Validators.required]);
    this.posts = new Array<IPost>();
  }

  ngOnInit() {
    this._meta.updateTitle('Search');
    this.assets();
    this.params();
    this.titleForm
      .valueChanges
      .pipe(debounceTime(500))
      .subscribe(title => {
        this._router.navigate(['/blog/search'], { queryParams: { title: title || null }, queryParamsHandling: 'merge' });
      });
    this.categoryForm
      .valueChanges
      .pipe(debounceTime(500))
      .subscribe(category => {
        const categoryQuery = this.categoryForm.valid ? category : null;
        this._router.navigate(['/blog/search'], { queryParams: { category: categoryQuery }, queryParamsHandling: 'merge' });
      })
  }

  private assets(): void {
    const tags = this._arrivals.listTag().pipe(take(1));
    const category = this._arrivals.listCategory().pipe(take(1));
    const params = this._route.queryParamMap.pipe(take(1));
    forkJoin({ tags, category, params }).subscribe(({ tags, category, params }) => {
      this.tagArray = tags.data ?? new Array<ITag>();
      this.optionalTags = this.tagArray.map(({ name }) => name);
      this.categoryArray = category.data ?? new Array<ICategory>();
      this.fillInputs(params);
      this.titleForm.enable();
      this.categoryForm.setValidators(FormValidator.includeIn(this.categoryArray, 'name'));
      this.categoryForm.updateValueAndValidity();
      this.categoryForm.enable();
      this.listPost();
    });
  }

  private params(): void {
    this._route.queryParamMap.pipe(skip(1)).subscribe(params => {
      this.fillInputs(params);
      this.listPost()
    });
  }

  private fillInputs(params: ParamMap): void {
    this.titleForm.setValue(params.get('title'));
    this.tags = params.get('tags') ? params.get('tags').split('-') : new Array<string>();
    this.categoryForm.setValue(params.get('category'));
  }

  private listPost(): void {
    let query: { title?: string; tags?: string[]; category?: string; } = {};
    if (this.titleForm.valid)
      query.title = this.titleForm.value;
    if (this.tags.length > 0)
      query.tags = this.tags.map(tag => this.tagArray.find(({ name }) => name === tag)?._id).filter(tag => tag);
    if (this.categoryForm.valid)
      query.category = this.categoryArray.find(({ name }) => name === this.categoryForm.value)?._id;
    if (Object.keys(query).length > 0) {
      this._arrivals.listPost(query).subscribe(({ data }) => {
        this.posts = data ?? new Array<IPost>();
      });
    } else
      this.posts = new Array<IPost>();
  }

  tagsUpdate(tags: string[]): void {
    const tagsQuery = tags.length > 0 ? tags.join('-') : null;
    this._router.navigate(['/blog/search'], { queryParams: { tags: tagsQuery }, queryParamsHandling: 'merge' });
  }
}