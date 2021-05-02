import { NgModule } from '@angular/core';
import { CommonModule, TitleCasePipe } from '@angular/common';

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
import { ContainerComponent } from './container/container.component';
import { WidgetsComponent } from './components/widgets/widgets.component';
import { LatestPostsComponent } from './components/latest-posts/latest-posts.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { TagsComponent } from './components/tags/tags.component';
import { WidgetSearchComponent } from './components/widget-search/widget-search.component';
import { CommentComponent } from './components/comment/comment.component';
import { CapitalizePipe } from '@shared/pipes/capitalize/capitalize.pipe';
import { ExtraPostsComponent } from './components/extra-posts/extra-posts.component';
import { TitleRoutPipe } from '@shared/pipes/title-rout/title-rout.pipe';


@NgModule({
  declarations: [
    HomeComponent,
    AnthologyComponent,
    PostComponent,
    SearchComponent,
    ContactComponent,
    ContainerComponent,
    WidgetsComponent,
    LatestPostsComponent,
    CategoriesComponent,
    TagsComponent,
    SearchComponent,
    WidgetSearchComponent,
    CommentComponent,
    ExtraPostsComponent,
  ],
  imports: [
    CommonModule,
    BlogRoutingModule,
    HttpClientModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    AngularEditorModule,
  ],
  providers: [TitleCasePipe, CapitalizePipe, TitleRoutPipe]
})
export class BlogModule { }
