import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { SpinnerInterceptorService } from '../spinner/spinner.interceptor';


@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnDestroy {
    private subscription: Subscription;
    public isSpinnerVisible: boolean = true;

  constructor(private spinnerInterceptorService: SpinnerInterceptorService) { 
     this.subscription = this.spinnerInterceptorService
            .pendingRequestsStatus
            .subscribe(hasPendingRequests => {
                this.isSpinnerVisible = hasPendingRequests;
            });
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }
}
