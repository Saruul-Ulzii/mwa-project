import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MessageResult } from '../fish/fishes/fishes.component';
import { Credentials, LoginToken } from '../user/login/login.component';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  private baseUrl = environment.REST_API_URL;
  constructor(private http: HttpClient) {}

  registerUser(user: Credentials): Observable<MessageResult> {
    const url: string = this.baseUrl + environment.USERS_API_URL;
    return this.http.post<MessageResult>(url, user);
  }

  loginUser(user: Credentials): Observable<LoginToken> {
    const url: string = this.baseUrl + environment.USERS_LOGIN_URL;
    return this.http.post<LoginToken>(url, user);
  }
}
