import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { AuthService } from '../services/auth.service';
import { RequestObject } from '../fish/fishes/fishes.component';
import { MessageService } from '../services/message.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService, private _msg: MessageService) {}

  intercept(
    request: HttpRequest<RequestObject>,
    next: HttpHandler
  ): Observable<HttpEvent<RequestObject>> {
    this._msg.clearMessage();

    const isSecureUrl =
      request.url.endsWith(environment.FISHES) &&
      request.method.startsWith(environment.POST_METHOD);

    if (this.auth.isLoggedIn && isSecureUrl) {
      request = request.clone({
        setHeaders: {
          Authorization: `${environment.BEARER_NAME} ${this.auth.token}`,
        },
      });
    }

    return next.handle(request);
  }
}
