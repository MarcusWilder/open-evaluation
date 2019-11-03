import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Button } from '@src/app/types/button';
import { MockdataService } from '@src/app/services/mockdata/mockdata.service';
import { Professor } from '@src/app/objects/professor';
import { Survey } from '@src/app/objects/survey';
import { ToastService } from '@src/app/services/toast/toast.service';
import { DEFAULT_QUESTIONS, CTL_QUESTIONS } from '@src/app/mock-data/mock-questions';

@Component({
  selector: 'app-create-survey',
  templateUrl: './create-survey.component.html'
})
export class CreateSurveyComponent implements OnInit {

  constructor(
    private router: Router,
    private toastService: ToastService,
    private mockdataService: MockdataService
  ) { }

  activeTab: string;
  surveyTitle: string;
  currentProfessor: Professor;
  courseOptions: object[] = [];
  courseSelection: string;
  surveyDataLoaded = false;
  surveyQuestions: { [option: string]: Survey } = {};
  templateOptions = [{ name: 'Default' }, { name: 'CTL' }];
  templateSelection = 'Default';

  buttons: Button[] = [
    {type: 'success', content: 'Create Survey' , onClick: () => this.createSurvey()},
    {type: 'destructive', content: 'Discard Survey', onClick: () => this.discardSurvey()},
  ];

  ngOnInit() {
    // this.mockdataService.getProfessor().subscribe(professor => {
    //   this.currentProfessor = professor;
    //   this.courseOptions = professor.courseList
    //   .map(function (course) {
    //     return {name: course.name, header: false};
    //   });
    // });

      this.surveyQuestions = {
        'Default': {
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
  //   const selectedCourse = this.courseSelection;

    // this.mockdataService.addSurvey({name: this.surveyTitle, questionList: DEFAULT_QUESTIONS} as Survey)
    //   .subscribe(newSurvey => {
    //     const effectedCourse = this.currentProfessor.courseList.filter(function (course) {
    //       return course.name === selectedCourse;
    //     });

    //     const actualCourse = effectedCourse[0];
    //     actualCourse.surveys = actualCourse.surveys.concat([newSurvey]);

        // this.mockdataService.updateCourse(actualCourse)
        //   .subscribe( () => {
        //     this.toastService.open('Survey Created!', this.surveyTitle + ' is now accessible to students.', 'success');
        //     this.router.navigateByUrl('/professor-dashboard');
        //   });
      // });?
  }

  discardSurvey() {
    this.toastService.open('Survey Discarded', this.surveyTitle + ' was discarded.', 'error');
    this.router.navigateByUrl('/professor-dashboard');
  }

}
