import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AccordionTab } from '@src/app/types/accordion-types';
import { Button } from '@src/app/types/button-group-types';
import { MockdataService } from '@src/app/services/mockdata/mockdata.service';

@Component({
  selector: 'app-professor-dashboard',
  templateUrl: './professor-dashboard.component.html'
})
export class ProfessorDashboardComponent implements OnInit {

  constructor(
    private router: Router,
    private mockdataService: MockdataService
  ) { }

  activeButtons: Button[] = [
    {type: 'brand', content: 'Edit', onClick: this.editSurvey},
    {type: 'destructive', content: 'Delete', onClick: this.deleteSurvey}
  ];

  activeTabs: AccordionTab[];

  cardButtons: Button[] = [
    {type: 'success', content: 'Create Survey', onClick: () => this.router.navigate(['/create-survey'])}
  ];

  closedButtons = [
    {type: 'brand', content: 'View Results', onClick: console.log('Viewing Results')},
  ];

  closedTabs = [
    {heading: 'CS 1301', items: ['Sample Survey 1', 'Sample Survey 2']},
    {heading: 'CS 1331', items: ['Sample Survey 3', 'Sample Survey 4']},
    {heading: 'CS 1332', items: ['Sample Survey 5', 'Sample Survey 6']},
  ];

  profName: string;
  academicField: string;
  surveySelection: any;

  ngOnInit() {
    this.mockdataService.getProfessor().subscribe(professor => {
      this.profName = `${professor.firstName} ${professor.lastName}`;
      this.academicField = professor.academicField + ' Professor';
      this.activeTabs = professor.courseList.map( (course) => {
        return {heading: course.name, items: course.surveys.map(survey => survey.name)};
      });
    });
  }

  deleteSurvey(item: string) {
    console.log(item);
  }

  editSurvey(item: string) {
    console.log(item);
  }
}
