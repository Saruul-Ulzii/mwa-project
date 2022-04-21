import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth.service';
import { FishDataService } from '../fish-data.service';
import { SearchService } from '../search.service';

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
@Component({
  selector: 'app-fishes',
  templateUrl: './fishes.component.html',
  styleUrls: ['./fishes.component.css'],
})
export class FishesComponent implements OnInit {
  searchText: string = '';
  fishes!: Fish[];

  get isLoggedIn() {
    return this._auth.isLoggedIn;
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

  getFishes(search: string) {
    this.fd.getFishes(search).subscribe({
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
        this.getFishes('');
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
}
