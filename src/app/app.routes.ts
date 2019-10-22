import { Routes } from '@angular/router';

import { HomeComponent } from '@src/app/home/home.component';
import { TestComponent } from '@src/app/test/test.component';
import { ProfessorDashboardComponent } from '@src/app/professor-dashboard/professor-dashboard.component';
import { CreateSurveyComponent } from '@src/app/create-survey/create-survey.component';

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
    path: 'create-survey',
    component: CreateSurveyComponent,
  },
  {
    path: '**',
    redirectTo: '/home',
  },
];
