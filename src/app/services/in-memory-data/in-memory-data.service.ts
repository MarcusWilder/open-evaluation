import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Injectable } from '@angular/core';
import { SURVEYS } from '@src/app/mock-data/mock-surveys';
import { STASKO } from '../../mock-data/mock-professors';
import { COURSES } from '@src/app/mock-data/mock-courses';
import { Survey } from '@src/app/objects/survey';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    return {
      surveys: SURVEYS,
      professor: STASKO,
      courses: COURSES
    };
  }

  genId(surveys: Survey[]): number {
    return surveys.length > 0 ? Math.max(...surveys.map(hero => hero.id)) + 1 : 1;
  }
}
