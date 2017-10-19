import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { AppService } from './app.service';
import { HttpClientModule } from '@angular/common/http';
import { SpinnerInterceptorService } from './spinner/spinner.interceptor';
import { Observable } from 'rxjs';

describe('AppComponent', () => {
  let appService: AppService;
  let app: AppComponent;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        SpinnerComponent
      ],
      providers: [AppService, SpinnerInterceptorService],
      imports: [HttpClientModule]
    }).compileComponents();

    const fixture = TestBed.createComponent(AppComponent);
    app = fixture.debugElement.componentInstance;

    appService = TestBed.get(AppService);
    spyOn(appService, 'getValues').and.returnValue(Observable.of(['values']));
  }));
  it('should create the app', async(() => {
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'HTTPInterceptor sample app'`, async(() => {
    expect(app.title).toEqual('HTTPInterceptor sample app');
  }));
  describe('when initialising', () => {
    beforeEach(() => {
      app.ngOnInit();
    });
    it(`should set values`, async(() => {
      expect(app.values).toEqual(['values']);
    }));
  });
});
