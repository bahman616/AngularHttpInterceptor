import { TestBed, async } from '@angular/core/testing';
import { SpinnerComponent } from './spinner.component';
import { SpinnerInterceptorService } from './spinner.interceptor';

describe('SpinnerComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SpinnerComponent,
        SpinnerComponent
      ],
      providers: [SpinnerInterceptorService]
    }).compileComponents();
  }));
  it('should create the component', async(() => {
    const fixture = TestBed.createComponent(SpinnerComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
