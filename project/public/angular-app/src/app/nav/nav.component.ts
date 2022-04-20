import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  constructor(private _auth: AuthService) {}

  get isLoggedIn() {
    return this._auth.isLoggedIn;
  }

  ngOnInit(): void {}
}
