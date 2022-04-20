import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

export class Credentials {
  username!: string;
  name!: string;
  password!: string;
}

export class LoginToken {
  success!: boolean;
  token!: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  get name() {
    return this._auth.name;
  }
  get isLoggedIn() {
    return this._auth.isLoggedIn;
  }

  user!: Credentials;
  constructor(private _auth: AuthService) {
    this.user = new Credentials();
  }

  ngOnInit(): void {}

  submit() {}
}
