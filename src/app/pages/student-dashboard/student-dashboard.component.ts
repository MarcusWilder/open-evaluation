import { Component, OnInit } from '@angular/core';

import { AccordionTab } from '@src/app/types/accordion-tab';
import { Button } from '@src/app/types/button';
import { MockdataService } from '@src/app/services/mockdata/mockdata.service';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html'
})
export class StudentDashboardComponent implements OnInit {

  constructor(
    private mockdataService: MockdataService
  ) { }

  activeButtons: Button[] = [
    {type: 'success', content: 'Take', onClick: this.takeSurvey},
  ];

  activeTabs: AccordionTab[];

  closedButtons = [
    {type: 'brand', content: 'View Response', onClick: console.log('Viewing Response')},
  ];

  closedTabs = [
    {heading: 'CS 1301', items: ['Sample Survey 1', 'Sample Survey 2']},
    {heading: 'CS 1331', items: ['Sample Survey 3', 'Sample Survey 4']},
    {heading: 'CS 1332', items: ['Sample Survey 5', 'Sample Survey 6']},
  ];

  profName: string;
  academicField: string;

  ngOnInit() {
    this.mockdataService.getProfessor().subscribe(professor => {
      this.profName = `${professor.firstName} ${professor.lastName}`;
      this.academicField = professor.academicField + ' Professor';
      this.activeTabs = this.mockdataService.getCourseListByID(professor.courseIDList).map( (course) => {
        return {heading: course.name, items: course.surveys.map(survey => survey.name)};
      });
    });
  }

  takeSurvey() {
    alert('Coming Soon :O');
  }
}
