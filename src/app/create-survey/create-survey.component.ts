import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ToastService } from '@src/app/services/toast/toast.service';

import { Button } from '../types/button-group-types';
import { MockdataService } from '../services/mockdata/mockdata.service';
import { Professor } from '../objects/professor';
import { Survey } from '../objects/survey';
import { QUESTIONS } from '../mock-data/mock-questions';

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
  coursePaceOptions = ['Too slow', 'About right', 'Too fast'];
  reachabilityOptions = ['Yes', 'Sometimes, but not enough', 'No'];
  surveyTitle: string;
  mcSelection: unknown;
  mcSelection2: unknown;
  currentProfessor: Professor;

  courseOptions: object[];
  courseSelection: string;

  buttons: Button[] = [
    {type: 'success', content: 'Create Survey' , onClick: () => this.createSurvey()},
    {type: 'destructive', content: 'Discard Survey', onClick: () => this.discardSurvey()},
  ];

  createSurvey() {
    const selectedCourse = this.courseSelection;

    this.mockdataService.addSurvey({name: this.surveyTitle, questionList: QUESTIONS} as Survey)
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

  ngOnInit() {
    this.mockdataService.getProfessor().subscribe(professor => {
      this.currentProfessor = professor;
      this.courseOptions = professor.courseList
      .map(function (course) {
        return {name: course.name, header: false};
      });
    });
  }

}
