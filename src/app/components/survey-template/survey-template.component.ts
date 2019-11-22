import { Component, Input } from '@angular/core';
import { Survey } from '@src/app/types/survey';
import { Question } from '@src/app/types/question';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

@Component({
  selector: 'app-survey-template',
  templateUrl: './survey-template.component.html',
  styleUrls: ['./survey-template.component.css']
})
export class SurveyTemplateComponent {

  constructor() { }

  surveyName: string;
  questions: Question[];
  _disabled: boolean = false;;

  @Input() set disabled(value: any) {
    this._disabled = coerceBooleanProperty(value);
  }

  @Input() set data(survey: Survey) {
    this.surveyName = survey ? survey.name : '';
    this.questions = survey ? survey.questions : [];
  };

  @Input() displayError: boolean = false;

}
