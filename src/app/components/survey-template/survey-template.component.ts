import { Component, Input } from '@angular/core';
import { Survey } from '@src/app/objects/survey';
import { Question } from '@src/app/objects/question';

@Component({
  selector: 'app-survey-template',
  templateUrl: './survey-template.component.html',
  styleUrls: ['./survey-template.component.css']
})
export class SurveyTemplateComponent {

  constructor() { }

  surveyName: string;
  questions: Question[];

  @Input() set data(survey: Survey) {
    this.surveyName = survey.name;
    this.questions = survey.questionList;
  };

  // coursePaceOptions = ['Too slow', 'About right', 'Too fast'];
  // reachabilityOptions = ['Yes', 'Sometimes, but not enough', 'No'];
  // mcSelection: unknown;
  // mcSelection2: unknown;
}
