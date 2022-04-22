import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  search: String = '';
  searchTextChange: Subject<String> = new Subject<String>();
  constructor() {
    this.searchTextChange.subscribe((searchValue) => {
      this.search = searchValue;
    });
  }

  changeSearch(searchValue: String) {
    this.search = searchValue;
    this.searchTextChange.next(this.search);
  }
}
