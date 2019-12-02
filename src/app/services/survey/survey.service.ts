import { Injectable } from '@angular/core';
import { Survey, SurveyResults } from '@src/app/types/survey';
import { Observable, combineLatest } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators'
import { ResponseData } from '@src/app/types/response';

const API_SERVER_URL = `http://localhost:4201`;

@Injectable({
  providedIn: 'root'
})
export class SurveyService {

  constructor(private http: HttpClient) { }

  getQuestionTemplates(): Observable<any> {
    return this.http.get(`${API_SERVER_URL}/templates`);
  }
  
  createSurvey(courseId: number, name: string, template: string, active: boolean): Observable<any> {
    return this.http.post(`${API_SERVER_URL}/surveys/${courseId}`, { name, template, active });
  }

  updateSurvey(courseId: number, surveyId: string, name: string, template: string, active: boolean): Observable<any> {
    return this.http.put(`${API_SERVER_URL}/surveys/${courseId}/${surveyId}`, { name, template, active });
  }
  
  getSurveyById(courseId: number, surveyId: string): Observable<Survey> {
    return this.http.get<Survey>(`${API_SERVER_URL}/surveys/${courseId}/${surveyId}`).pipe(
      tap(survey => console.log('Survey loaded:', survey)),
    );
  }

  getSurveyResultsById(courseId: number, surveyId: string): Observable<SurveyResults> {
    return this.http.get<SurveyResults>(`${API_SERVER_URL}/surveys/${courseId}/${surveyId}/responses`)
  }

  closeSurveyById(courseId: number, surveyId: string): Observable<any> {
    return this.http.put(`${API_SERVER_URL}/surveys/${courseId}/${surveyId}`, { active: false });
  }

  deleteSurveyById(courseId: number, surveyId: string): Observable<Survey> {
    return this.http.delete<Survey>(`${API_SERVER_URL}/surveys/${courseId}/${surveyId}`)
  }

  getSurveysByCourseId(courseId: number, userId?: number): Observable<Survey[]> {
    if (userId) {
      return this.http.get<Survey[]>(`${API_SERVER_URL}/surveys/${courseId}?userId=${userId}`);
    }
    return this.http.get<Survey[]>(`${API_SERVER_URL}/surveys/${courseId}`);
  }

  getSurveysByCourseIds(courseIds: number[], userId?: number): Observable<Survey[][]> {
    let surveyObservables: Observable<Survey[]>[] = courseIds.map(id => this.getSurveysByCourseId(id, userId));
    return combineLatest(surveyObservables);
  }

  submitResponse(courseId: number, surveyId: string, hashedUserId: string, responses: ResponseData[]): Observable<any[]> {
    return this.http.post<any[]>(`${API_SERVER_URL}/surveys/${courseId}/${surveyId}/responses`, {
      hashedUserId,
      responses
    });
  }
}
