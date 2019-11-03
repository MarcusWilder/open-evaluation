import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Button } from '@src/app/types/button';
import { MockdataService } from '@src/app/services/mockdata/mockdata.service';
import { Professor } from '@src/app/objects/professor';
import { Survey } from '@src/app/objects/survey';
import { ToastService } from '@src/app/services/toast/toast.service';
import { DEFAULT_QUESTIONS, CTL_QUESTIONS } from '@src/app/mock-data/mock-questions';
import { UserService } from '@src/app/services/user/user.service';
import { SurveyService } from '@src/app/services/survey/survey.service';
import { TemplateType } from '@src/app/types/template-type';

@Component({
  selector: 'app-create-survey',
  templateUrl: './create-survey.component.html'
})
export class CreateSurveyComponent implements OnInit {

  constructor(
    private router: Router,
    private toastService: ToastService,
    private mockdataService: MockdataService,
    private userService: UserService,
    private surveyService: SurveyService,
  ) { }

  activeTab: string;
  surveyTitle: string;
  currentProfessor: Professor;
  courseOptions: object[] = [];
  courseSelection: object;
  surveyDataLoaded = false;
  surveyQuestions: { [option: string]: Survey } = {};
  templateOptions = [
    { name: 'Default', data: TemplateType.DEFAULT },
    { name: 'CTL', data: TemplateType.CTL }
  ];
  templateSelection = this.templateOptions[0];

  buttons: Button[] = [
    {type: 'success', content: 'Create Survey' , onClick: () => this.createSurvey()},
    {type: 'destructive', content: 'Discard Survey', onClick: () => this.discardSurvey()},
  ];

  ngOnInit() {
    this.userService.user$.subscribe(user => {
      this.courseOptions = user.courses.map(c => {
        return { name: c.courseName, data: c.courseId };
      });
    });
    this.surveyQuestions = {
      'DEFAULT': {
        surveyId: 0,
        name: 'Default Template',
        template: 'DEFAULT',
        questionList: DEFAULT_QUESTIONS,
        active: true
      },
      'CTL': {
        surveyId: 1,
        name: 'CTL Template',
        template: 'CTL',
        questionList: CTL_QUESTIONS,
        active: true
      }        
    };
    this.surveyDataLoaded = true;
  }

  createSurvey() {
    if (!this.courseSelection) {
      this.toastService.open('Please select a course', '', 'warning');
      return;
    }
    const courseId = this.courseSelection['data'];
    const template: TemplateType = this.templateSelection['data'];
    const name = this.surveyTitle || 'Untitled';
    this.surveyService.createSurvey(courseId, name, template).subscribe(() => {
      this.toastService.open('Survey Created!', this.surveyTitle + ' is now accessible to students.', 'success');
      this.router.navigateByUrl('/professor-dashboard');
    });
  }

  discardSurvey() {
    this.toastService.open('Survey Discarded', this.surveyTitle + ' was discarded.', 'error');
    this.router.navigateByUrl('/professor-dashboard');
  }

}
