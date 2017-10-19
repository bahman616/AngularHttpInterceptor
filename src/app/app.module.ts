import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { SpinnerInterceptorService, SpinnerInterceptorServiceFactoryProvider } from './spinner/spinner.interceptor';
import { AppService } from './app.service';

const SpinnerInterceptorServiceExistingProvider = {
  provide: HTTP_INTERCEPTORS,
  useExisting: SpinnerInterceptorService,
  multi: true
};

@NgModule({
  declarations: [
    AppComponent,
    SpinnerComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [    
    AppService,
    SpinnerInterceptorServiceExistingProvider,
    SpinnerInterceptorServiceFactoryProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
