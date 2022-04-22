import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = environment.APP_TITLE;

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    const token = localStorage.getItem(environment.TOKEN_STORAGE_KEY);
    if (token) {
      this.auth.token = token;
      this.auth.isLoggedIn = true;
    }
  }
}
