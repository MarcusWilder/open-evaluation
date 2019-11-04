import { Component, OnInit } from '@angular/core';

import { AccordionTab } from '@src/app/types/accordion-tab';
import { Button } from '@src/app/types/button';
import { MockdataService } from '@src/app/services/mockdata/mockdata.service';
import { User, UserService } from '@src/app/services/user/user.service';
import { SurveyService } from '@src/app/services/survey/survey.service';
import { Router } from '@angular/router';
import { CourseWithSurveys } from '@src/app/objects/survey';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html'
})
export class StudentDashboardComponent implements OnInit {

  constructor(
    private mockdataService: MockdataService,
    private router: Router,
    private userService: UserService,
    private surveyService: SurveyService
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
      type: 'success',
      content: 'Take',
      onClick: (courseIndex: number, surveyIndex: number) => {
        this.takeSurvey.call(
          this,
          this.activeSurveys[courseIndex].courseId,
          this.activeSurveys[courseIndex].surveys[surveyIndex].surveyId
        );
      }
    }
  ];

  closedButtons = [
    {
      type: 'brand',
      content: 'View Response',
      onClick: (courseIndex: number, surveyIndex: number) => {
        const courseId = this.closedSurveys[courseIndex].courseId;
        const surveyId = this.closedSurveys[courseIndex].surveys[surveyIndex].surveyId;
        const studentId = this.userService.user.id;
        this.surveyService.fetchResponse(courseId, surveyId, studentId).subscribe(responses => {
          console.log(responses);
        });
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

  takeSurvey(courseId: number, surveyId: number): void {
    this.router.navigateByUrl(`/take-survey/${courseId}/${surveyId}`);
  }
}
