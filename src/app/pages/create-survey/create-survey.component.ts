import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { Button } from '@src/app/types/button';
import { MockdataService } from '@src/app/services/mockdata/mockdata.service';
import { Professor } from '@src/app/objects/professor';
import { Survey } from '@src/app/objects/survey';
import { ToastService } from '@src/app/services/toast/toast.service';
import { QUESTIONS } from '@src/app/mock-data/mock-questions';
import { UserService } from '@src/app/services/user/user.service';
import { SurveyService } from '@src/app/services/survey/survey.service';
import { TemplateType, toDisplayString } from '@src/app/types/template-type';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-create-survey',
  templateUrl: './create-survey.component.html'
})
export class CreateSurveyComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private toastService: ToastService,
    private userService: UserService,
    private surveyService: SurveyService,
  ) { }

  courseId?: number;
  surveyId?: number;
  editing: boolean = false;
  active: boolean = true;
  surveyTitle: string;
  currentProfessor: Professor;
  courseOptions: object[] = [];
  courseSelection: object;
  surveyDataLoaded = false;
  surveyQuestions: { [option: string]: Survey } = {};
  templateOptions = Object.values(TemplateType).map(type => {
    return { name: toDisplayString(type), data: type }
  })
  templateSelection = this.templateOptions[0];

  buttons: Button[] = [
    {type: 'success', content: 'Save' , onClick: () => {
      if (this.editing) {
        this.updateSurvey();
      } else {
        this.createSurvey();
      }
    }},
    {type: 'destructive', content: 'Discard', onClick: () => this.discardSurvey()},
  ];

  ngOnInit() {
    this.surveyQuestions = {};
    Object.keys(QUESTIONS).forEach(type => {
      this.surveyQuestions[type] = {
        _id: 0,
        name: `${type} Survey Template`,
        template: type,
        questionList: QUESTIONS[type],
        active: true
      }
    });

    this.userService.user$.subscribe(user => {
      this.courseOptions = user.courses.map(c => {
        return { name: c.courseName, data: c.courseId };
      });
      this.route.url.subscribe(segments => {
        if (segments[0].path === 'edit-survey') {
          // Editing mode
          this.editing = true;
          // Load data
          this.route.paramMap.pipe(
            switchMap((params: ParamMap) => {
              this.courseId = +params.get('courseId')
              this.surveyId = +params.get('surveyId')        
              return this.surveyService.getSurveyById(this.courseId, this.surveyId);
            })
          ).subscribe(survey => {
            console.log(survey.template, this.templateOptions);
            this.active = survey.active;
            this.surveyTitle = survey.name;
            this.courseSelection = this.courseOptions.find(c => c['courseId'] === this.courseId) || this.courseOptions[0];
            this.templateSelection = this.templateOptions.find(c => c.data === survey.template) || this.templateOptions[0];
          });
      
        }
      })
  
    });
    this.surveyDataLoaded = true;
  }

  updateSurvey() {
    const template: TemplateType = this.templateSelection['data'];
    const name = this.surveyTitle || 'Untitled';
    const active = this.active;
    this.surveyService.updateSurvey(this.courseId, this.surveyId, name, template, active).subscribe(() => {
      this.toastService.open('Survey Updated!','', 'success');
      this.router.navigateByUrl('/professor-dashboard');
    });

  }

  createSurvey() {
    if (!this.courseSelection) {
      this.toastService.open('Please select a course', '', 'warning');
      return;
    }
    const courseId = this.courseSelection['data'];
    const template: TemplateType = this.templateSelection['data'];
    const name = this.surveyTitle || 'Untitled';
    const active = this.active
    this.surveyService.createSurvey(courseId, name, template, active).subscribe(() => {
      this.toastService.open('Survey Created!', this.surveyTitle + ' is now accessible to students.', 'success');
      this.router.navigateByUrl('/professor-dashboard');
    });
  }

  discardSurvey() {
    this.toastService.open('Survey Discarded', this.surveyTitle + ' was discarded.', 'error');
    this.router.navigateByUrl('/professor-dashboard');
  }

}
