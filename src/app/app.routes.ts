import { Routes } from '@angular/router';

import { CreateSurveyComponent } from '@src/app/pages/create-survey/create-survey.component';
import { HomeComponent } from '@src/app/pages/home/home.component';
import { ProfessorDashboardComponent } from '@src/app/pages/professor-dashboard/professor-dashboard.component';
import { StudentDashboardComponent } from './pages/student-dashboard/student-dashboard.component';
import { TestComponent } from '@src/app/test/test.component';
import { TakeSurveyComponent } from '@src/app/pages/take-survey/take-survey.component';
import { ViewResultsComponent } from '@src/app/pages/view-results/view-results.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: '___test',
    component: TestComponent,
  },
  {
    path: 'professor-dashboard',
    component: ProfessorDashboardComponent,
  },
  {
    path: 'student-dashboard',
    component: StudentDashboardComponent,
  },
  {
    path: 'create-survey',
    component: CreateSurveyComponent,
  },
  {
    path: 'edit-survey/:courseId/:surveyId',
    component: CreateSurveyComponent,
  },
  {
    path: 'take-survey/:courseId/:surveyId',
    component: TakeSurveyComponent,
  },
  {
    path: 'view-results/:courseId/:surveyId',
    component: ViewResultsComponent,
  },
  {
    path: '**',
    redirectTo: '/home',
  },
];
