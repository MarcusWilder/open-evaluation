import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Survey } from './objects/survey';
import { Professor } from './objects/professor';
import { Course } from './objects/course';
import { QUESTIONS } from './mock-data/mock-questions';


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

  getSurveys(): Observable<Survey[]> {
    return this.http.get<Survey[]>(this.surveysUrl)
      .pipe(
        tap(_ => console.log('fetched surveys')),
        catchError(this.handleError<Survey[]>('getSurveys', []))
      );
  }

  addSurvey(survey: Survey): Observable<Survey> {
    console.log('create new survey');
    return this.http.post<Survey>(this.surveysUrl, survey, this.httpOptions).pipe(
      tap((newSurvey: Survey) => console.log(`added survey w/ id=${newSurvey.id}`)),
      catchError(this.handleError<Survey>('addSurvey'))
    );
  }

  deleteSurvey(survey: Survey | number): Observable<Survey> {
    const id = typeof survey === 'number' ? survey : survey.id;
    const url = `${this.surveysUrl}/${id}`;

    return this.http.delete<Survey>(url, this.httpOptions).pipe(
      tap(_ => console.log(`deleted survey id=${id}`)),
      catchError(this.handleError<Survey>('deleteSurvey'))
    );
  }

  getProfessor(): Observable<Professor> {
    return this.http.get<Professor>(this.professorUrl)
      .pipe(
        tap(_ => console.log('fetched professor')),
        catchError(this.handleError<Professor>('getProfessor'))
      );
  }

  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.coursesUrl)
      .pipe(
        tap(_ => console.log('fetched courses')),
        catchError(this.handleError<Course[]>('getProfessor', []))
      );
  }

  updateCourse(course: Course): Observable<Course> {
    console.log('update course' + course.id);
    return this.http.post<Course>(this.surveysUrl, course, this.httpOptions).pipe(
      tap((updatedCourse: Course) => console.log(`updated course w/ id=${updatedCourse.id}`)),
      catchError(this.handleError<Course>('addCourse'))
    );
  }

  deleteCourse(course: Course | number): Observable<Course> {
    const id = typeof course === 'number' ? course : course.id;
    const url = `${this.coursesUrl}/${id}`;

    return this.http.delete<Course>(url, this.httpOptions).pipe(
      tap(_ => console.log(`deleted course id=${id}`)),
      catchError(this.handleError<Course>('deleteCourse'))
    );
  }


  addCourse(course: Course): Observable<Course> {
    console.log('create new course');
    return this.http.post<Course>(this.coursesUrl, course, this.httpOptions).pipe(
      tap((newCourse: Course) => console.log(`added course w/ id=${newCourse.id}`)),
      catchError(this.handleError<Course>('addCourse'))
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
