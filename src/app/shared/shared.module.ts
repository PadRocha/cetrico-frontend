import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ScrollToTopComponent } from './components/scroll-to-top/scroll-to-top.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CapitalizePipe } from './pipes/capitalize/capitalize.pipe';
import { TimeAgoPipe } from './pipes/time-ago/time-ago.pipe';
import { TagInputComponent } from './components/tag-input/tag-input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TitleRoutPipe } from './pipes/title-rout/title-rout.pipe';



@NgModule({
  declarations: [
    CapitalizePipe,
    TimeAgoPipe,
    TitleRoutPipe,
    HeaderComponent,
    FooterComponent,
    ScrollToTopComponent,
    TagInputComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    ReactiveFormsModule,
  ],
  exports: [
    CapitalizePipe,
    TimeAgoPipe,
    TitleRoutPipe,
    HeaderComponent,
    FooterComponent,
    ScrollToTopComponent,
    TagInputComponent
  ],
})
export class SharedModule { }
