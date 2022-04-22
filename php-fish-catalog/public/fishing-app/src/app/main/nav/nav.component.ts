import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  get isLoggedIn() {
    return this._auth.isLoggedIn;
  }
  get message() {
    return this._msg.infoMessage;
  }
  constructor(private _auth: AuthService, private _msg: MessageService) {}

  ngOnInit(): void {}
}
