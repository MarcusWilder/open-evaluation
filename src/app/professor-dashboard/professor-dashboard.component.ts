import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AccordionTab } from '../types/accordion-types';
import { Button } from '@src/app/types/button-group-types';
import { MockdataService } from '../services/mockdata/mockdata.service';

@Component({
  selector: 'app-professor-dashboard',
  templateUrl: './professor-dashboard.component.html'
})
export class ProfessorDashboardComponent implements OnInit {

  constructor(
    private router: Router,
    private mockdataService: MockdataService
  ) { }

  accordionButtons: Button[] = [
    {type: 'brand', content: 'Edit', onClick: this.editSurvey},
    {type: 'destructive', content: 'Delete', onClick: this.deleteSurvey}
  ];

  accordionTabs: AccordionTab[];

  cardButtons: Button[] = [
    {type: 'success', content: 'Create Survey', onClick: () => this.router.navigate(['/create-survey'])}
  ];

  profName: string;
  academicField: string;

  ngOnInit() {
    this.mockdataService.getProfessor().subscribe(professor => {
      this.profName = `${professor.firstName} ${professor.lastName}`;
      this.academicField = professor.academicField + ' Professor';
      this.accordionTabs = professor.courseList.map( (course) => {
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
