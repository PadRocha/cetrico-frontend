import { Component, OnInit } from '@angular/core';
import { ITag } from '@shared/models/tag';
import { ArrivalsService } from 'app/blog/services/arrivals/arrivals.service';

@Component({
  selector: 'widget-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss'],
  host: { 'class': 'widget d-block' },
})
export class TagsComponent implements OnInit {
  tags: ITag[];
  tagIsLoading: boolean;
  tagPage: number
  tagHasNextPage: boolean;

  constructor(
    private _arrivals: ArrivalsService,
  ) {
    this.tags = new Array<ITag>();
    this.tagIsLoading = true;
    this.tagPage = 1;
    this.tagHasNextPage = false;
  }

  ngOnInit(): void {
    this.listTags();
  }

  private listTags(): void {
    this.tagIsLoading = false;
    this._arrivals.listTagPage(this.tagPage).subscribe(res => {
      this.tags = this.tags.concat(res.data);
      this.tagHasNextPage = res.hasNextPage;
      this.tagIsLoading = true;
    });
  }

  addTag(): void {
    if (this.tagIsLoading) {
      ++this.tagPage;
      this.listTags();
    }
  }
}
