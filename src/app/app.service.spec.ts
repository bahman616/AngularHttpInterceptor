import { AppService } from './app.service';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('AppService', () => {
  let appService: AppService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        AppService
      ]
    });

    appService = TestBed.get(AppService);
    httpMock = TestBed.get(HttpTestingController);
  });
  describe('when getting the values', () => {
    beforeEach(() => {
      appService.getValues().subscribe();
    });
    it('expects a GET request to retrieve projects', () => {
      const req = httpMock.expectOne(`http://localhost:3000/values`);
      expect(req.request.method).toEqual('GET');
    });
  });
});
