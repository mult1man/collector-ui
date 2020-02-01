import {NgModule} from '@angular/core';
import {BookRoutingModule} from './book-routing.module';
import {BookSearchComponent} from './book-search/book-search.component';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    BookRoutingModule
  ],
  declarations: [
    BookSearchComponent
  ]
})
export class BookModule {
}
