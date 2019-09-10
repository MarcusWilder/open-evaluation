import { Routes } from '@angular/router';

import { DashboardComponent } from '@src/app/dashboard/dashboard.component';
import { HomeComponent } from '@src/app/home/home.component';
import { TestComponent } from '@src/app/test/test.component';

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
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: '___test',
    component: TestComponent,
  },
  {
    path: '**',
    redirectTo: '/home',
  }
];
