import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogRoutingModule } from './blog-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { AnthologyComponent } from './pages/anthology/anthology.component';
import { PostComponent } from './pages/post/post.component';
import { SearchComponent } from './pages/search/search.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { ContactComponent } from './pages/contact/contact.component';


@NgModule({
  declarations: [HomeComponent, AnthologyComponent, PostComponent, SearchComponent, ContactComponent],
  imports: [
    CommonModule,
    BlogRoutingModule,
    HttpClientModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    AngularEditorModule
  ]
})
export class BlogModule { }
