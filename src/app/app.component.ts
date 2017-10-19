import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  title = 'HTTPInterceptor sample app';
  values: string[];
  constructor(private appService: AppService) {
  }

  ngOnInit(){
    this.appService.getValues().subscribe(v => {
      this.values = v;
    });
  }
}
