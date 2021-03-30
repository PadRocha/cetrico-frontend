import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContainerComponent } from './container/container.component';
import { AnthologyComponent } from './pages/anthology/anthology.component';
import { ContactComponent } from './pages/contact/contact.component';
import { HomeComponent } from './pages/home/home.component';
import { PostComponent } from './pages/post/post.component';
import { SearchComponent } from './pages/search/search.component';

const routes: Routes = [{
  path: '',
  component: ContainerComponent,
  children: [{
    path: 'home',
    component: HomeComponent,
  }, {
    path: 'anthology',
    component: AnthologyComponent
  }, {
    path: 'post/:title',
    component: PostComponent
  }, {
    path: 'search',
    component: SearchComponent
  }, {
    path: 'contact',
    component: ContactComponent
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
