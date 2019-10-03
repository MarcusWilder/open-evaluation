import { Component, OnInit } from '@angular/core';
import { Button } from '../types/button-group-types';
import { Router } from '@angular/router';
import { ToastService } from '@src/app/services/toast/toast.service';

import { MockdataService } from '../mockdata.service';
import { Professor } from '../objects/professor';
import { Survey } from '../objects/survey';
import { QUESTIONS } from '../mock-data/mock-questions';

@Component({
  selector: 'app-create-survey',
  templateUrl: './create-survey.component.html',
  styleUrls: ['./create-survey.component.css']
})
export class CreateSurveyComponent implements OnInit {

  constructor(private router: Router, private toastService: ToastService, private mockdataService: MockdataService) { }

  activeTab: string;
  globalNavTabs = ['Home', 'Features', 'Resources'];
  coursePaceOptions = ['too slow', 'about right', 'too fast'];
  reachabilityOptions = ['Yes', 'Sometimes, but not enough', 'No'];
  surveyTitle: string;
  mcSelection: unknown;
  mcSelection2: unknown;
  currentProfessor: Professor;

  // Get these options from Stasko's course list
  courseOptions: object[];
  courseSelection: string;

  buttons: Button[] = [
    {type: 'success', content: 'Create Survey' , onClick: () => this.createSurvey()},
    {type: 'destructive', content: 'Discard Survey', onClick: () => this.discardSurvey()},
  ];

  createSurvey() {
    console.log(this.courseSelection);
    const selectedCourse = this.courseSelection;

    this.mockdataService.addSurvey({name: this.surveyTitle, questionList: QUESTIONS} as Survey)
      .subscribe(newSurvey => {
        const effectedCourse = this.currentProfessor.courseList.filter(function (course) {
          console.log(course.name + selectedCourse);
          return course.name === selectedCourse;
        });

        console.log('effectedCourse:' + effectedCourse[0].id);

        this.mockdataService.deleteCourse(effectedCourse[0])
          .subscribe(deletedCourse => {
            this.mockdataService.addCourse({id: effectedCourse[0].id, name: effectedCourse[0].name, professor: effectedCourse[0].professor,
              roster: effectedCourse[0].roster, surveys: effectedCourse[0].surveys.concat(newSurvey) })
                .subscribe(newCourse => {
                  this.toastService.open('Survey Created!', this.surveyTitle + ' is now accessible to students.', 'success');
                  this.router.navigateByUrl('/professor-dashboard');
                });
          });

        console.log('**New Survey Posted');
      });
  }

  discardSurvey() {
    this.toastService.open('Survey Discarded', this.surveyTitle + ' was discarded.', 'error');
    this.router.navigateByUrl('/professor-dashboard');
    console.log('****Discard Survey');
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
      console.log(surveys);
    });

  }

}
