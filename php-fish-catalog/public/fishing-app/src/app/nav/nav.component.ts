import { Component, OnInit } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth.service';
import { SearchService } from '../search.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  get isLoggedIn() {
    return this._auth.isLoggedIn;
  }
  get message() {
    return this._auth.infoMessage;
  }
  constructor(private _auth: AuthService, private router: Router) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        if (event.url != '/') {
          this._auth.clearMessage();
        }
      }
    });
  }

  ngOnInit(): void {}
}
