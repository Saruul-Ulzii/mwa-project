import { Injectable } from '@angular/core';
import { InfoMessage } from '../user/login/login.component';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  #infoMessage: InfoMessage = new InfoMessage(false, '');

  set infoMessage(infoMessage: InfoMessage) {
    this.#infoMessage = infoMessage;
  }
  get infoMessage() {
    return this.#infoMessage;
  }
  clearMessage() {
    this.infoMessage.message = '';
    this.#infoMessage.success = false;
  }
}
