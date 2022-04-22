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
    this.#token = token;
    localStorage.setItem(environment.TOKEN_STORAGE_KEY, token);
    this.isLoggedIn = true;
  }

  get name() {
    let name: string = environment.DUMMY_NAME;

    if (this.token) {
      name = this.jwt.decodeToken(
        localStorage.getItem(environment.TOKEN_STORAGE_KEY) as string
      ).name;
    }
    return name;
  }

  set name(name) {
    localStorage.setItem(environment.TOKEN_STORAGE_KEY, name);
    this.isLoggedIn = true;
  }

  deleteToken() {
    localStorage.clear();
    this.isLoggedIn = false;
  }

  constructor(private jwt: JwtHelperService) {}
}
