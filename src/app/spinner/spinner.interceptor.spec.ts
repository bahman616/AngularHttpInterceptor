/*
source:
https://github.com/mpalourdio/ng-http-loader/blob/master/src/app/pending-interceptor.service.spec.ts
*/
import { async, inject, TestBed } from '@angular/core/testing';
import { SpinnerInterceptorService } from './spinner.interceptor';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';

describe('SpinnerInterceptorService', () => {

    const SpinnerInterceptorServiceExistingProvider = {
        provide: HTTP_INTERCEPTORS,
        useExisting: SpinnerInterceptorService,
        multi: true
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [SpinnerInterceptorService, SpinnerInterceptorServiceExistingProvider]
        });
    });

    it('should be created', inject([SpinnerInterceptorService], (service: SpinnerInterceptorService) => {
        expect(service).toBeTruthy();
    }));

    it('should be aware of the pending http requests',
        inject(
            [SpinnerInterceptorService, HttpClient, HttpTestingController],
            (service: SpinnerInterceptorService, http: HttpClient, httpMock: HttpTestingController) => {

                function runQuery(url: string): Observable<any> {
                    return http.get(url);
                }

                Observable.forkJoin([runQuery('/fake'), runQuery('/fake2')]).subscribe();

                const firstRequest = httpMock.expectOne('/fake');
                const secondRequest = httpMock.expectOne('/fake2');

                expect(service.pendingRequests).toBe(2);
                firstRequest.flush({});

                expect(service.pendingRequests).toBe(1);
                secondRequest.flush({});

                expect(service.pendingRequests).toBe(0);

                httpMock.verify();
            })
    );

    it('should correctly notify the pendingRequestsStatus observable', async(
        inject(
            [SpinnerInterceptorService, HttpClient, HttpTestingController],
            (service: SpinnerInterceptorService, http: HttpClient, httpMock: HttpTestingController) => {
                const pendingRequestsStatus = service.pendingRequestsStatus;

                pendingRequestsStatus
                    .subscribe(
                        (next: boolean) => expect(next).toBeTruthy(),
                        (error: HttpErrorResponse) => expect(1).toBe(2)
                    );

                http.get('/fake').subscribe();
                httpMock.expectOne('/fake');
            })
    ));

    it('should fail correctly',
        inject(
            [SpinnerInterceptorService, HttpClient, HttpTestingController],
            (service: SpinnerInterceptorService, http: HttpClient, httpMock: HttpTestingController) => {

                const statusText = 'NOT FOUND';

                http.get('/fake').subscribe(
                    (next: boolean) => expect(true).toBe(false),
                    (error: HttpErrorResponse) => expect(error.statusText).toBe(statusText)
                );

                const testRequest = httpMock.expectOne('/fake');
                testRequest.flush({}, {
                    'headers': {
                        'name': 'useless-header'
                    },
                    'status': 404,
                    'statusText': statusText
                });
                httpMock.verify();
            })
    );
});