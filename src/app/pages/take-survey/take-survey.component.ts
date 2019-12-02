import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { SurveyService } from '@src/app/services/survey/survey.service';
import { Survey } from '@src/app/types/survey';
import { Button } from '@src/app/types/button';
import { UserService } from '@src/app/services/user/user.service';
import { ResponseData } from '@src/app/types/response';
import { ToastService } from '@src/app/services/toast/toast.service';
import * as hash from 'hash.js';

@Component({
  selector: 'app-take-survey',
  templateUrl: './take-survey.component.html',
  styleUrls: ['./take-survey.component.css']
})
export class TakeSurveyComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private toastService: ToastService,
    private userService: UserService,
    private surveyService: SurveyService,
  ) { }

  private courseId: number;
  private surveyId: string;

  surveyData: Survey = null;   // `surveyData` willed be passed into `SurveyTemplateComponent` and answers will be appended in place
  surveyDataLoaded = false;
  submissionAttempted = false;

  validateResponse() {
    return this.surveyData.questions.every(question => {
      switch(question.type) {
        case 'FREE_RESPONSE':
            return question.answer && question.answer.length > 0;
        case 'RANKING':
        case 'MULTIPLE_CHOICE':        
        default:
            return question.answer !== undefined;
      }
    })
  }

  buttons: Button[] = [{
    content: 'Submit',
    type: 'success',
    onClick: () => {
      if (!this.courseId || !this.surveyId) return;
      const user = this.userService.user;
      const responses: ResponseData[] = this.surveyData.questions.map(question => ({
        questionId: question._id,
        questionType: question.type,
        studentResponse: question.answer
      }));
      this.submissionAttempted = true;        
      if (!this.validateResponse()) {
        this.toastService.open('Oops...', 'Please answer EVERY question!', 'warning');
        return;
      }
      const hashedUserId = hash.sha256().update(this.userService.user.id).digest('hex');
      this.surveyService.submitResponse(this.courseId, this.surveyId, hashedUserId, responses).subscribe(() => {
        this.surveyData.questions.forEach(question => {
          question.answer = null;
        })
        this.toastService.open('Submitted!', 'Your response has been recorded', 'success');
        this.location.back();
      }); 
    }
  }, {
    content: 'Cancel',
    type: 'destructive',
    onClick: () => {
      this.surveyData.questions.forEach(q => q.answer = null);
      this.location.back();
    }
  }];

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        this.courseId = +params.get('courseId')
        this.surveyId = params.get('surveyId')        
        return this.surveyService.getSurveyById(this.courseId, this.surveyId);
      })
    ).subscribe(survey => {
      this.surveyData = survey;
      this.surveyDataLoaded = true;
    });
  }

}
