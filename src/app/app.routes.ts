import { Routes } from '@angular/router';

import { CreateSurveyComponent } from '@src/app/pages/create-survey/create-survey.component';
import { HomeComponent } from '@src/app/pages/home/home.component';
import { ProfessorDashboardComponent } from '@src/app/pages/professor-dashboard/professor-dashboard.component';
import { StudentDashboardComponent } from './pages/student-dashboard/student-dashboard.component';
import { TestComponent } from '@src/app/test/test.component';
import { TakeSurveyComponent } from '@src/app/pages/take-survey/take-survey.component';

export const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: '/home',
  //   pathMatch: 'full',
  // },
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
    path: 'take-survey/:courseId/:surveyId',
    component: TakeSurveyComponent,
  },
  // {
  //   path: '**',
  //   redirectTo: '/home',
  // },
];
