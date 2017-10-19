import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AppService {
  constructor(private httpClient: HttpClient) { }

  getValues() {
    return this.httpClient.get<string[]>('http://localhost:3000/values');
  }
}