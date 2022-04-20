import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Credentials } from '../register/register.component';
import { UserDataService } from '../user-data.service';

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
  constructor(
    private _userService: UserDataService,
    private _auth: AuthService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.user = new Credentials();
  }

  submit() {
    this._userService.loginUser(this.user).subscribe({
      next: (loggedResponse) => this.login(loggedResponse),
      error: (err) => {
        console.log(err);
      },
      complete: () => {},
    });
  }

  login(loggedResponse: LoginToken) {
    console.log(loggedResponse);
    this._auth.token = loggedResponse.token;
    this._router.navigate(['/']);
  }

  logout() {
    this._auth.deleteToken();
  }
}
