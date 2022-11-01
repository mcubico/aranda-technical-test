import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';
import { HttpErrorDialogService } from '../services/http-error-dialog.service';
import { HttpErrorModel } from '../models/http-error.model';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
  constructor(private _httpErrorDialogService: HttpErrorDialogService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('request --->>>');
    console.log(request)

    return next.handle(request)
      .pipe(
        map((response: HttpEvent<any>) => {
          console.log('response --->>>');
          console.log(response)

          return response;
        }),
        catchError((error: HttpErrorResponse) => {
          console.log('HttpErrorResponse --->>>');
          console.log(error);

          const standardReason = 'Sorry, we are having problems communicating with our servers, please try again later.';

          const data: HttpErrorModel = {
            reason: standardReason,
            status: error.status
          };

          if (data.status == 0)
            data.reason = 'Sorry, our servers are offline';

          this._httpErrorDialogService.openDialog(data);

          return throwError(error);
        }),
        catchError((error) => {
          console.log('error --->>>');
          console.log(error);

          return throwError(error);
        })
      );
  }
}
