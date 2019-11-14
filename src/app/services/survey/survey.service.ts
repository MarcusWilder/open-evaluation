import { Injectable } from '@angular/core';
import { Survey, CourseWithSurveys } from '@src/app/objects/survey';
import { DEFAULT_QUESTIONS, CTL_QUESTIONS, QUESTIONS } from '@src/app/mock-data/mock-questions';
import { Observable, of, combineLatest } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators'
import { ResponseData } from '@src/app/types/response';
import { TemplateType } from '@src/app/types/template-type';

const API_SERVER_URL = `http://localhost:4201`;

@Injectable({
  providedIn: 'root'
})
export class SurveyService {

  constructor(private http: HttpClient) { }

  createSurvey(courseId: number, name: string, template: TemplateType, active: boolean): Observable<any> {
    return this.http.post(`${API_SERVER_URL}/surveys/${courseId}`, { name, template, active });
  }

  updateSurvey(courseId: number, surveyId: number, name: string, template: TemplateType, active: boolean): Observable<any> {
    return this.http.put(`${API_SERVER_URL}/surveys/${courseId}/${surveyId}`, { name, template, active });
  }
  
  getSurveyById(courseId: number, surveyId: number): Observable<Survey> {
    return this.http.get<Survey>(`${API_SERVER_URL}/surveys/${courseId}/${surveyId}`).pipe(
      tap(survey => console.log('Survey loaded:', survey)),
      map(survey => ({
        ...survey,
        questionList: QUESTIONS[survey.template]        
      }))
    );
  }

  deleteSurveyById(courseId: number, surveyId: number): Observable<Survey> {
    return this.http.delete<Survey>(`${API_SERVER_URL}/surveys/${courseId}/${surveyId}`)
  }

  getSurveysByCourseId(courseId: number): Observable<Survey[]> {
    return this.http.get<Survey[]>(`${API_SERVER_URL}/surveys/${courseId}`).pipe(
      map(surveys => surveys.map(survey => ({
        ...survey,
        questionList: QUESTIONS[survey.template]        
      })))
    );
  }

  getSurveysByCourseIds(courseIds: number[]): Observable<Survey[][]> {
    let surveyObservables: Observable<Survey[]>[] = courseIds.map(id => this.getSurveysByCourseId(id));
    return combineLatest(surveyObservables);
  }
  
  submitResponse(courseId: number, surveyId: number, responseData: ResponseData): Observable<any[]> {
    return this.http.post<any[]>(`${API_SERVER_URL}/surveys/${courseId}/${surveyId}/responses`, responseData);
  }
}
