import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Button } from '@src/app/types/button';
import { Survey } from '@src/app/types/survey';
import { ToastService } from '@src/app/services/toast/toast.service';
import { UserService } from '@src/app/services/user/user.service';
import { SurveyService } from '@src/app/services/survey/survey.service';
import { TemplateType, toDisplayString } from '@src/app/types/template-type';
import { switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-create-survey',
  templateUrl: './create-survey.component.html'
})
export class CreateSurveyComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private toastService: ToastService,
    private http: HttpClient,
    private userService: UserService,
    private surveyService: SurveyService,
  ) { }

  courseId?: number;
  surveyId?: number;
  editing: boolean = false;
  active: boolean = true;
  surveyTitle: string;
  courseOptions: object[] = [];
  courseSelection: object;
  surveyDataLoaded = false;
  surveyQuestions: { [option: string]: Survey } = {};
  templateOptions = Object.values(TemplateType).map(type => {
    return { name: toDisplayString(type), data: type }
  })
  templateSelection = this.templateOptions[0];

  buttons: Button[] = [
    {
      type: 'success',
      content: 'Save',
      onClick: () => {
        if (this.editing) {
          this.updateSurvey();
        } else {
          this.createSurvey();
        }
      }
    },
    {
      type: 'destructive',
      content: 'Cancel',
      onClick: () => {
        if (this.editing) {
          this.cancel();
        } else {
          this.discardSurvey()
        }
      }
    },
  ];

  ngOnInit() {
    this.surveyQuestions = {};
    this.surveyService.getQuestionTemplates().subscribe(templates => {
      Object.keys(templates).forEach(type => {
        this.surveyQuestions[type] = {
          _id: '',
          name: `${type} Survey Template`,
          template: type,
          questions: templates[type],
          active: true
        }
      });
      this.surveyDataLoaded = true;
    });


    const user = this.userService.user;
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
          this.active = survey.active;
          this.surveyTitle = survey.name;
          this.courseSelection = this.courseOptions.find(c => c['data'] === this.courseId) || this.courseOptions[0];
          this.templateSelection = this.templateOptions.find(c => c.data === survey.template) || this.templateOptions[0];
        });
    
      }
    });
  }

  updateSurvey() {
    const template: TemplateType = this.templateSelection['data'];
    const name = this.surveyTitle || 'Untitled';
    const active = this.active;
    this.surveyService.updateSurvey(this.courseId, this.surveyId, name, template, active).subscribe(() => {
      this.toastService.open('Survey Updated!','', 'success');
      this.router.navigateByUrl('/professor-dashboard');
    }, () => {
      this.toastService.open('Error', 'Failed to update survey.', 'error');
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
    }, () => {
      this.toastService.open('Error', 'Failed to create survey.', 'error');
    });
  }

  discardSurvey() {
    this.toastService.open('Survey Discarded', this.surveyTitle + ' was discarded.', 'error');
    this.router.navigateByUrl('/professor-dashboard');
  }

  cancel() {
    this.router.navigateByUrl('/professor-dashboard');
  }

}
