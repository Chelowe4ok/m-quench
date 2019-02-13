import { Injectable, Injector } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { LocalStorageService, AUTH_KEY } from './../local-storage/local-storage.service';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private localStorageService: LocalStorageService;
  constructor(private injector: Injector) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.localStorageService = this.injector.get(LocalStorageService);
    const token: string = this.localStorageService.getItem(AUTH_KEY) ? this.localStorageService.getItem(AUTH_KEY).token : null;

    if (token) {
        request = request.clone({
          setHeaders: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
    }

    return next.handle(request);
  }
}
