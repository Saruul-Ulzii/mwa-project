import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { throwIfEmpty } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { FishDataService } from 'src/app/services/fish-data.service';
import { SearchService } from 'src/app/services/search.service';
import { environment } from 'src/environments/environment';

export class Fish {
  _id!: string;
  name!: string;
  family!: string;
  food!: string;
  distribution: Distribution[] = [];
}
export class Distribution {
  d_name!: string;
}
export class MessageResult {
  message!: {};
}
export class RequestObject {}
@Component({
  selector: 'app-fishes',
  templateUrl: './fishes.component.html',
  styleUrls: ['./fishes.component.css'],
})
export class FishesComponent implements OnInit {
  searchText: string = '';
  fishes!: Fish[];
  offset: number = 0;

  get isLoggedIn() {
    return this._auth.isLoggedIn;
  }

  get isPageable() {
    return (
      this.fishes && this.fishes.length > environment.COUNT_DEFAULT_VALUE - 1
    );
  }

  constructor(
    private fd: FishDataService,
    private route: ActivatedRoute,
    private searchService: SearchService,
    private _auth: AuthService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const search = params[environment.SEARCH_QUERY_PARAM] || '';
      this.searchService.changeSearch(search);
      this.getFishes(search);
    });
  }

  getFishes(search: string = '') {
    this.fd.getFishes(search, this.offset).subscribe({
      next: (fishes) => {
        this.fishes = fishes;
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('fishes fetch completed');
      },
    });
  }

  deleteFish(fishId: String) {
    this.fd.deleteFish(fishId).subscribe({
      next: (result) => {
        console.log('delete result', result);
        this.getFishes();
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('fishes fetch completed');
      },
    });
  }

  search() {
    this.getFishes(this.searchText);
    this.searchService.changeSearch(this.searchText);
  }

  prev() {
    this.offset -= environment.COUNT_DEFAULT_VALUE;
    this.offset = this.offset < 0 ? 0 : this.offset;
    this.getFishes();
  }

  next() {
    this.offset += environment.COUNT_DEFAULT_VALUE;
    this.getFishes();
  }
}
