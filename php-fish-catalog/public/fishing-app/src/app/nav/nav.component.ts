import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { SearchService } from '../search.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  searchText: String = '';
  constructor(private route: Router, private searchService: SearchService) {}

  ngOnInit(): void {
    this.searchService.searchTextChange.subscribe((searchedText) => {
      this.searchText = searchedText;
    });
  }

  search() {
    this.searchService.changeSearch(this.searchText);
    this.route.navigate([environment.PATH_FISHES], {
      queryParams: {
        search: this.searchText,
      },
    });
  }
}
