import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'src/app/services/message.service';
import { UserDataService } from 'src/app/services/user-data.service';
import { environment } from 'src/environments/environment';
import { AuthService } from '../../services/auth.service';

export class Credentials {
  username!: string;
  name!: string;
  password!: string;
}

export class LoginToken {
  success!: boolean;
  token!: string;
}
export class InfoMessage {
  success!: boolean;
  message!: string;

  constructor(success: boolean, message: string) {
    this.success = success;
    this.message = message;
  }
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
    private _auth: AuthService,
    private _msg: MessageService,
    private _userService: UserDataService,
    private _router: Router
  ) {
    this.user = new Credentials();
  }

  ngOnInit(): void {}

  submit() {
    this._msg.clearMessage();
    this._userService.loginUser(this.user).subscribe({
      next: (loggedResponse) => this.login(loggedResponse),
      error: (err) => {
        console.log(err);
        this._msg.infoMessage = new InfoMessage(
          false,
          environment.INCORRECT_CREDENTIALS
        );
      },
      complete: () => {},
    });
  }

  login(loggedResponse: LoginToken) {
    this._auth.token = loggedResponse.token;
    this._msg.infoMessage = new InfoMessage(true, environment.LOGIN_SUCCESS);
    this._router.navigate(['/']);
  }

  logout() {
    this._auth.deleteToken();
  }
}
