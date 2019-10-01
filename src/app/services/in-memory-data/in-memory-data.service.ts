import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Injectable } from '@angular/core';
import { SURVEYS } from '@src/app/mock-data/mock-surveys';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    return {
      surveys: SURVEYS
    }
  }
}
