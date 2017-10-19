/*
source:
https://github.com/mpalourdio/ng-http-loader/blob/master/src/app/pending-interceptor.service.ts
*/
import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/finally';
import 'rxjs/add/observable/throw';

@Injectable()
export class SpinnerInterceptorService implements HttpInterceptor {
    private _pendingRequests = 0;
    private _pendingRequestsStatus = new Subject<boolean>();

    get pendingRequestsStatus(): Observable<boolean> {
        return this._pendingRequestsStatus.asObservable();
    }

    get pendingRequests(): number {
        return this._pendingRequests;
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        this._pendingRequests++;

        if (1 === this._pendingRequests) {
            this._pendingRequestsStatus.next(true);
        }

        return next.handle(req).map(event => {
            return event;
        })
            .catch(error => {
                return Observable.throw(error);
            })
            .finally(() => {
                  this._pendingRequests--;

                  if (0 === this._pendingRequests) {
                      this._pendingRequestsStatus.next(false);
                  }
            });
    }
}

export function SpinnerInterceptorServiceFactory() {
    return new SpinnerInterceptorService();
}

export let SpinnerInterceptorServiceFactoryProvider = {
    provide: SpinnerInterceptorService,
    useFactory: SpinnerInterceptorServiceFactory
};
