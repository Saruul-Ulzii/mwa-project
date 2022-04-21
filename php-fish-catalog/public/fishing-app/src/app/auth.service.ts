import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { InfoMessage } from './login/login.component';

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
    let name: string = 'Unknown';

    if (this.token) {
      name = this.jwt.decodeToken(
        localStorage.getItem(environment.TOKEN_STORAGE_KEY) as string
      ).name;
    }
    return name;
  }

  #infoMessage: InfoMessage = new InfoMessage(false, '');
  set infoMessage(errorMessage: InfoMessage) {
    this.#infoMessage = errorMessage;
  }
  get infoMessage() {
    return this.#infoMessage;
  }
  set name(name) {
    localStorage.setItem(environment.TOKEN_STORAGE_KEY, name);
    this.isLoggedIn = true;
  }

  clearMessage() {
    this.infoMessage.message = '';
    this.#infoMessage.success = false;
  }

  deleteToken() {
    localStorage.clear();
    this.isLoggedIn = false;
  }

  constructor(private jwt: JwtHelperService) {}
}
