import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AccordionTab } from '@src/app/types/accordion-types';
import { Button } from '@src/app/types/button-group-types';
import { MockdataService } from '@src/app/services/mockdata/mockdata.service';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html'
})
export class StudentDashboardComponent implements OnInit {

  constructor(
    private router: Router,
    private mockdataService: MockdataService
  ) { }

  accordionButtons: Button[] = [
    {type: 'success', content: 'Take', onClick: this.takeSurvey},
  ];

  accordionTabs: AccordionTab[];

  cardButtons: Button[] = [
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

  takeSurvey() {
    alert('Coming Soon :O');
  }
}
