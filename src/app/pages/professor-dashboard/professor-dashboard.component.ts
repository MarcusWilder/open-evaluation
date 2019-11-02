import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AccordionTab } from '@src/app/types/accordion-tab';
import { Button } from '@src/app/types/button';
import { MockdataService } from '@src/app/services/mockdata/mockdata.service';
import { CourseWithSurveys } from '@src/app/objects/survey';
import { SurveyService } from '@src/app/services/survey/survey.service';
import { UserService, User } from '@src/app/services/user/user.service';
import { currentId } from 'async_hooks';

@Component({
  selector: 'app-professor-dashboard',
  templateUrl: './professor-dashboard.component.html'
})
export class ProfessorDashboardComponent implements OnInit {

  constructor(
    private router: Router,
    private mockdataService: MockdataService,
    private surveyService: SurveyService,
    private userService: UserService
  ) { }

  name: string;
  activeSurveys: CourseWithSurveys[] = [];
  closedSurveys: CourseWithSurveys[] = [];

  get activeTabs(): AccordionTab[] {
    return this.activeSurveys.map(({ courseName, surveys }) => {
      return { heading: courseName, items: surveys.map(s => s.name)}
    });
  }
  get closedTabs(): AccordionTab[] {
    return this.closedSurveys.map(({ courseName, surveys }) => {
      return { heading: courseName, items: surveys.map(s => s.name)}
    });

  }

  activeButtons: Button[] = [
    {
      type: 'brand',
      content: 'Edit',
      onClick: (courseIndex: number, surveyIndex: number) => {
        const courseId = this.activeSurveys[courseIndex].courseId;
        const surveyId = this.activeSurveys[courseIndex].surveys[surveyIndex].surveyId;
        this.router.navigateByUrl(`/take-survey/${courseId}/${surveyId}`);
      }
    }
  ];

  closedButtons = [
    {
      type: 'destructive',
      content: 'Delete',
      onClick: (courseIndex: number, surveyIndex: number) => {
        const courseId = this.closedSurveys[courseIndex].courseId;
        const surveyId = this.closedSurveys[courseIndex].surveys[surveyIndex].surveyId;
        this.surveyService.deleteSurveyById(courseId, surveyId).subscribe();
      }
    }
  ];


  ngOnInit() {
    this.userService.user$.subscribe((user: User) => {
      this.name = user.name;
      let courseIds = user.courses.map(c => c.courseId);
      this.surveyService.getSurveysByCourseIds(courseIds).subscribe(surveysForEachCourse => { 
        this.activeSurveys = surveysForEachCourse.map((surveys, i) => {
          let course = user.courses[i];
          return { ...course, surveys: surveys.filter(s => s.active) };
        });

        this.closedSurveys = surveysForEachCourse.map((surveys, i) => {
          let course = user.courses[i];
          return { ...course, surveys: surveys.filter(s => !s.active) };
        });   

      })
    });
  }
}
