import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { FishDataService } from '../fish-data.service';
import { SearchService } from '../search.service';

export class Fish {
  _id!: String;
  name!: String;
  family!: String;
  food!: String;
  distribution: Distribution[] = [];
}
export class Distribution {
  d_name!: String;
}
@Component({
  selector: 'app-fishes',
  templateUrl: './fishes.component.html',
  styleUrls: ['./fishes.component.css'],
})
export class FishesComponent implements OnInit {
  fishes!: Fish[];
  constructor(
    private fd: FishDataService,
    private route: ActivatedRoute,
    private searchService: SearchService
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
        console.log(result);
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
}
