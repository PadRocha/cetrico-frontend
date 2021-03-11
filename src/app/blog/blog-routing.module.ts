import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnthologyComponent } from './pages/anthology/anthology.component';
import { HomeComponent } from './pages/home/home.component';
import { PostComponent } from './pages/post/post.component';
import { SearchComponent } from './pages/search/search.component';

const routes: Routes = [{
  path: '',
  children: [{
    path: 'home',
    component: HomeComponent,
  }, {
    path: 'anthology',
    component: AnthologyComponent
  }, {
    path: 'post',
    component: PostComponent
  }, {
    path: 'search',
    component: SearchComponent
  }, {
    path: '**',
    redirectTo: 'home'
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule { }
