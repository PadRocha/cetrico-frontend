import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogRoutingModule } from './blog-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { AnthologyComponent } from './pages/anthology/anthology.component';
import { PostComponent } from './pages/post/post.component';
import { SearchComponent } from './pages/search/search.component';


@NgModule({
  declarations: [HomeComponent, AnthologyComponent, PostComponent, SearchComponent],
  imports: [
    CommonModule,
    BlogRoutingModule
  ]
})
export class BlogModule { }
