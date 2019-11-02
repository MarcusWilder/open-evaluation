import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { Course } from '../../objects/course';
import { Professor } from '../../objects/professor';
import { Survey } from '../../objects/survey';


@Injectable({
  providedIn: 'root'
})
export class MockdataService {

  private surveysUrl = 'api/surveys';
  private professorUrl = 'api/professor';
  private coursesUrl = 'api/courses';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.coursesUrl)
      .pipe(
        tap(_ => console.log('fetched courses')),
        catchError(this.handleError<Course[]>('getProfessor', []))
      );
  }

  getProfessor(): Observable<Professor> {
    return this.http.get<Professor>(this.professorUrl)
      .pipe(
        tap(_ => console.log('fetched professor')),
        catchError(this.handleError<Professor>('getProfessor'))
      );
  }

  getSurveys(): Observable<Survey[]> {
    return this.http.get<Survey[]>(this.surveysUrl)
      .pipe(
        tap(_ => console.log('fetched surveys')),
        catchError(this.handleError<Survey[]>('getSurveys', []))
      );
  }

  addSurvey(survey: Survey): Observable<Survey> {
    console.log(this.surveysUrl, survey);
    return this.http.post<Survey>(this.surveysUrl, survey, this.httpOptions).pipe(
      tap((newSurvey: Survey) => console.log(`added survey w/ id=${newSurvey.surveyId}`)),
      catchError(this.handleError<Survey>('addSurvey'))
    );
  }

  // deleteSurvey(survey: Survey | number): Observable<Survey> {
  //   const id = typeof survey === 'number' ? survey : survey.id;
  //   const url = `${this.surveysUrl}/${id}`;

  //   return this.http.delete<Survey>(url, this.httpOptions).pipe(
  //     tap(_ => console.log(`deleted survey id=${id}`)),
  //     catchError(this.handleError<Survey>('deleteSurvey'))
  //   );
  // }

  updateCourse(course: Course): Observable<Course> {
    return this.http.put<Course>(this.coursesUrl, course, this.httpOptions).pipe(
      tap((updatedCourse: Course) => console.log(`updated course w/ id=${updatedCourse.id}`)),
      catchError(this.handleError<Course>('updateCourse'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
