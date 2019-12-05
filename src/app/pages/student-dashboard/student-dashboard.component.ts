import { Component, OnInit } from '@angular/core';

import { AccordionTab } from '@src/app/types/accordion-tab';
import { Button } from '@src/app/types/button';
import { User, UserService } from '@src/app/services/user/user.service';
import { SurveyService } from '@src/app/services/survey/survey.service';
import { Router } from '@angular/router';
import { CourseWithSurveys } from '@src/app/types/survey';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html'
})
export class StudentDashboardComponent implements OnInit {

  constructor(
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
          this.activeSurveys[courseIndex].surveys[surveyIndex]._id
        );
      }
    }
  ];

  closedButtons = [
    // {
    //   type: 'brand',
    //   content: 'View Response',
    //   onClick: (courseIndex: number, surveyIndex: number) => {
    //     const courseId = this.closedSurveys[courseIndex].courseId;
    //     const surveyId = this.closedSurveys[courseIndex].surveys[surveyIndex]._id;
    //     const studentId = this.userService.user.id;
    //   }
    // }
  ];

  ngOnInit() {
    this.userService.user$.subscribe((user: User) => {
      this.name = user.name;
      let courseIds = user.courses.map(c => c.courseId);
      this.surveyService.getSurveysByCourseIds(courseIds, user.id).subscribe(surveysForEachCourse => { 
        this.activeSurveys = surveysForEachCourse.map((surveys, i) => {
          let course = user.courses[i];
          return { ...course, surveys: surveys.filter(s => s.active && !s.completed) };
        });

        this.closedSurveys = surveysForEachCourse.map((surveys, i) => {
          let course = user.courses[i];
          return { ...course, surveys: surveys.filter(s => !s.active || s.completed) };
        });   

      })
    });
  }

  takeSurvey(courseId: number, surveyId: number): void {
    this.router.navigateByUrl(`/take-survey/${courseId}/${surveyId}`);
  }
}
