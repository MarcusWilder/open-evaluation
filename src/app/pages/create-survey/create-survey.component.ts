import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ToastService } from '@src/app/services/toast/toast.service';

import { Button } from '../../types/button-group-types';
import { MockdataService } from '../../services/mockdata/mockdata.service';
import { Professor } from '../../objects/professor';
import { Survey } from '../../objects/survey';
import { DEFAULT_QUESTIONS } from '../../mock-data/mock-questions';

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
    this.mockdataService.getProfessor().subscribe(professor => {
      this.currentProfessor = professor;
      this.courseOptions = professor.courseList
      .map(function (course) {
        return {name: course.name, header: false};
      });
    });

    this.mockdataService.getSurveys().subscribe(surveys => {
      this.surveyQuestions['Default'] = surveys[0];
      this.surveyQuestions['CTL'] = surveys[1];
      this.surveyDataLoaded = true;
    })
  }

  createSurvey() {
    const selectedCourse = this.courseSelection;

    this.mockdataService.addSurvey({name: this.surveyTitle, questionList: DEFAULT_QUESTIONS} as Survey)
      .subscribe(newSurvey => {
        const effectedCourse = this.currentProfessor.courseList.filter(function (course) {
          return course.name === selectedCourse;
        });

        const actualCourse = effectedCourse[0];
        actualCourse.surveys = actualCourse.surveys.concat([newSurvey]);

        this.mockdataService.updateCourse(actualCourse)
          .subscribe( () => {
            this.toastService.open('Survey Created!', this.surveyTitle + ' is now accessible to students.', 'success');
            this.router.navigateByUrl('/professor-dashboard');
          });
      });
  }

  discardSurvey() {
    this.toastService.open('Survey Discarded', this.surveyTitle + ' was discarded.', 'error');
    this.router.navigateByUrl('/professor-dashboard');
  }

}
