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
        console.log(courseIndex, surveyIndex)
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
        console.log('View Response')
        // this.takeSurvey.call(
        //   this,
        //   this.activeSurveys[courseIndex].courseId,
        //   this.activeSurveys[courseIndex].surveys[surveyIndex].surveyId
        // );
      }
    }
  ];

  name: string;
  academicField: string;

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
