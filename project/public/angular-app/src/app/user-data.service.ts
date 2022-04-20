import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Credentials } from './register/register.component';
import { LoginToken } from './login/login.component';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  private baseUrl = environment.rest_api_users_base_url;
  constructor(private http: HttpClient) {}

  registerUser(user: Credentials): Observable<any> {
    const headers = { 'content-type': 'application/json' };

    const url: string = this.baseUrl + '/users';
    return this.http.post<any>(url, user);
  }

  loginUser(user: Credentials): Observable<LoginToken> {
    const headers = { 'content-type': 'application/json' };

    const url: string = this.baseUrl + '/users/login';
    return this.http.post<LoginToken>(url, user);
  }
}
