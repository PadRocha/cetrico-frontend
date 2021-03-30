import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { ICategory } from '@shared/models/category';
import { DataPaginated } from '@shared/models/interfaces';
import { IPost } from '@shared/models/post';
import { ITag } from '@shared/models/tag';

@Injectable({
  providedIn: 'root'
})
export class ArrivalsService {
  private url: string;

  constructor(
    private _http: HttpClient,
  ) {
    this.url = environment.httpUrl;
  }
}
