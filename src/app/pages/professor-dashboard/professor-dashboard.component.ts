import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AccordionTab } from '@src/app/types/accordion-tab';
import { Button } from '@src/app/types/button';
import { MockdataService } from '@src/app/services/mockdata/mockdata.service';
import { CourseWithSurveys } from '@src/app/objects/survey';
import { SurveyService } from '@src/app/services/survey/survey.service';
import { UserService, User } from '@src/app/services/user/user.service';
import { ToastService } from '@src/app/services/toast/toast.service';

@Component({
  selector: 'app-professor-dashboard',
  templateUrl: './professor-dashboard.component.html'
})
export class ProfessorDashboardComponent implements OnInit {

  constructor(
    private router: Router,
    private mockdataService: MockdataService,
    private surveyService: SurveyService,
    private userService: UserService,
    private toastService: ToastService
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

  cardButtons: Button[] = [
    {
      type: 'success',
      content: 'Create Survey',
      onClick: () => this.router.navigate(['/create-survey',])
    }
  ];
  
  activeButtons: Button[] = [
    {
      type: 'brand',
      content: 'Edit',
      onClick: (courseIndex: number, surveyIndex: number) => {
        const courseId = this.activeSurveys[courseIndex].courseId;
        const surveyId = this.activeSurveys[courseIndex].surveys[surveyIndex].surveyId;
        this.router.navigateByUrl(`/take-survey/${courseId}/${surveyId}`);
      }
    },
    {
      type: 'destructive',
      content: 'Delete',
      onClick: (courseIndex: number, surveyIndex: number) => {
        const courseId = this.activeSurveys[courseIndex].courseId;
        const surveyId = this.activeSurveys[courseIndex].surveys[surveyIndex].surveyId;
        const surveyTitle = this.activeSurveys[courseIndex].surveys[surveyIndex].name;
        this.surveyService.deleteSurveyById(courseId, surveyId).subscribe(() => {
          this.toastService.open('Survey Deleted', surveyTitle + ' was discarded.', 'info');
          this.loadData();
        });
      }
    }
  ];

  closedButtons = [
    {
      type: 'brand',
      content: 'View Results',
      onClick: () => console.log('Viewing Results')
    },
  ];

  loadData() {
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

  ngOnInit() {
    this.loadData();
  }
}
