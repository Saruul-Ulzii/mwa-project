import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  #isLoggedIn: boolean = false;
  get isLoggedIn() {
    return this.#isLoggedIn;
  }
  set isLoggedIn(isLogged) {
    this.#isLoggedIn = isLogged;
  }

  #token: string = '';
  get token() {
    return this.#token;
  }
  set token(token) {
    localStorage.setItem(environment.token_storage_key, token);
    this.isLoggedIn = true;
  }

  #name: string = '';
  get name() {
    let name: string = 'unknown';
    if (this.token) {
      name = this.jwt.decodeToken(environment.token_storage_key) as string;
    }
    return name;
  }
  set name(name) {
    localStorage.setItem(environment.token_storage_key, name);
    this.isLoggedIn = true;
  }

  deleteToken() {
    localStorage.clear();
    this.isLoggedIn = false;
  }

  constructor(private jwt: JwtHelperService) {}
}
