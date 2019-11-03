import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { SurveyService } from '@src/app/services/survey/survey.service';
import { Subject } from 'rxjs';
import { Question } from '@src/app/objects/question';
import { Survey } from '@src/app/objects/survey';
import { Button } from '@src/app/types/button';
import { UserService } from '@src/app/services/user/user.service';
import { ResponseData } from '@src/app/types/response';
import { ToastService } from '@src/app/services/toast/toast.service';

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
  private surveyId: number;

  surveyData: Survey = null;   // `surveyData` willed be passed into `SurveyTemplateComponent` and answers will be appended in place
  surveyDataLoaded = false;

  buttons: Button[] = [{
    content: 'Submit',
    type: 'success',
    onClick: () => {
      if (!this.courseId || !this.surveyId) return;
      this.userService.user$.subscribe(user => {
        const responses = this.surveyData.questionList.map(question => question.answer);
        let responseData: ResponseData = {
          _id: {
            courseId: this.courseId,
            surveyId: this.surveyId,
            studentId: user.id  
          },
          template: this.surveyData.template,
          responses
        }
        this.surveyService.submitResponse(responseData).subscribe(() => {
          this.toastService.open('Submitted!', 'Your response has been recorded', 'success');    
          this.location.back();
        }); 
      })
    }
  }, {
    content: 'Cancel',
    type: 'destructive',
    onClick: () => {
      this.surveyData.questionList.forEach(q => q.answer = null);
      this.location.back();
    }
  }];

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        this.courseId = +params.get('courseId')
        this.surveyId = +params.get('surveyId')        
        return this.surveyService.getSurveyById(this.courseId, this.surveyId);
      })
    ).subscribe(survey => {
      this.surveyData = survey;
      this.surveyDataLoaded = true;
      this.userService.user$.subscribe(user => {
        // Fill in previous responses
        this.surveyService.fetchResponse(this.courseId, this.surveyId, user.id).subscribe(responses => {
          if (!responses) return;
          this.surveyData.questionList.forEach((question, i) => {
            question.answer = responses[i];
          });
        })
      });
    });
  }

}
