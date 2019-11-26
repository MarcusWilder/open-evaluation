import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Button } from '@src/app/types/button';
import { MockdataService } from '@src/app/services/mockdata/mockdata.service';
import { Professor } from '@src/app/objects/professor';
import { Survey } from '@src/app/objects/survey';
import { ToastService } from '@src/app/services/toast/toast.service';
import { DEFAULT_QUESTIONS } from '@src/app/mock-data/mock-questions';

import * as frame from 'tns-core-modules/ui/frame';
import { View } from 'tns-core-modules/ui/frame';
import { TextView } from 'tns-core-modules/ui/text-view';
import { LayoutBase } from 'tns-core-modules/ui/layouts/layout-base';
import { RouterExtensions } from 'nativescript-angular/router';

@Component({
  selector: 'app-create-survey',
  templateUrl: './create-survey.component.html',
  styleUrls: ['./create-survey.component.tns.css']
})
export class CreateSurveyComponent implements OnInit {

  constructor(
    private router: Router,
    private routerExtensions: RouterExtensions,
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

  public hardCodedQuestion: any[] = [
    {question: 'How well prepared did you feel for this exam?', options: [
      {value: '1', selected: false},
      {value: '2', selected: false},
      {value: '3', selected: false},
      {value: '4', selected: false},
      {value: '5', selected: false}
    ]},
    {question: 'How would you rate the difficulty of the exam?', options: [
      {value: '1', selected: false},
      {value: '2', selected: false},
      {value: '3', selected: false},
      {value: '4', selected: false},
      {value: '5', selected: false}
    ]},
    {question: 'How would you rate the length of the exam?', options: [
      {value: '1', selected: false},
      {value: '2', selected: false},
      {value: '3', selected: false},
      {value: '4', selected: false},
      {value: '5', selected: false},
    ]},
  ];

  submitConfirmationVisible = false;

  optionTapped(questionIndex: number, optionIndex: number) {
    this.hardCodedQuestion[questionIndex].options.forEach(option => {
      option.selected = false;
    });

    this.hardCodedQuestion[questionIndex].options[optionIndex].selected = !this.hardCodedQuestion[questionIndex].options[optionIndex].selected;
    console.log('!$#@!$#@!$#@!$#@ Option Selected');
  }

  showSubmitConfirmation() {
    console.log('show!!');
    this.submitConfirmationVisible = true;

    const currentPage = frame.topmost().currentPage;
    const confirmationScreen: View = currentPage.getViewById('confirmationScreen');

    const surveyView: View = currentPage.getViewById('surveyView');
    this.setIsUserInteractionEnabledRecursive(surveyView, false);

    confirmationScreen.animate({
        opacity: 1,
        duration: 300
    });
  }

  hideSubmitConfirmation() {
    this.routerExtensions.back();
    console.log('hide!!');
    const currentPage = frame.topmost().currentPage;
    const confirmationScreen: View = currentPage.getViewById('confirmationScreen');

    const surveyView: View = currentPage.getViewById('surveyView');
    this.setIsUserInteractionEnabledRecursive(surveyView, true);

    confirmationScreen.animate({
        opacity: 0,
        duration: 300
    }).then(() => {
      this.submitConfirmationVisible = false;
    });
  }

  setIsUserInteractionEnabledRecursive(view: View, isEnabled: boolean): void {
    if (!(view instanceof TextView)) {
      view.isUserInteractionEnabled = isEnabled;
    }

    if (view instanceof LayoutBase) {
        const layoutBase = <LayoutBase>view;
        for (let i = 0, length = layoutBase.getChildrenCount(); i < length; i++) {
          const child = layoutBase.getChildAt(i);
            this.setIsUserInteractionEnabledRecursive(child, isEnabled);
        }
    }
  }

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
    });

    // const frame = require('tns-core-modules/ui/frame');
    // const platform = require('tns-core-modules/platform');
    // if (this.platform.isIOS) {
    //   const navigationBar = frame.topmost().ios.controller.navigationBar;
    //   navigationBar.barStyle = UIBarStyle.Black;
    // }
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
