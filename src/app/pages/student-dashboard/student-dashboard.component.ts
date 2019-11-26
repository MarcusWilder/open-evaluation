import { Component, OnInit } from '@angular/core';

import { AccordionTab } from '@src/app/types/accordion-tab';
import { Button } from '@src/app/types/button';
import { MockdataService } from '@src/app/services/mockdata/mockdata.service';

import { ItemEventData } from 'tns-core-modules/ui/list-view';
import { Router } from '@angular/router';


@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html'
})
export class StudentDashboardComponent implements OnInit {

  constructor(
    private mockdataService: MockdataService,
    private router: Router
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

  modalOpen = false;

  public hardCodedCourses: any[] = [
    {title: 'CS 1100', subtitle: '2 Surveys to Complete', surveys: ['Test Survey 1', 'Test Survey 2', 'Test Survey 3'], selected: false},
    {title: 'CS 1331', subtitle: 'No Active Surveys', surveys: ['Test Survey 1', 'Test Survey 2', 'Test Survey 3'], selected: false},
    {title: 'MATH 1552', subtitle: 'No Active Surveys', surveys: ['Test Survey 1', 'Test Survey 2', 'Test Survey 3'], selected: false},
    {title: 'EAS 1600', subtitle: 'No Active Surveys', surveys: ['Test Survey 1', 'Test Survey 2', 'Test Survey 3'], selected: false}
  ];

  toggleAccordion(index: number) {
    console.log('!@$#@!$#@!$#@ Logout Test');
    this.hardCodedCourses[index].selected = !this.hardCodedCourses[index].selected;
  }

  tappedSurvey() {
    this.router.navigate(['create-survey']);
  }

  logoutTest() {
    console.log('!@$#@!$#@!$#@ Logout Test');
    this.modalOpen = !this.modalOpen;
  }

  ngOnInit() {
    this.mockdataService.getProfessor().subscribe(professor => {
      this.profName = `${professor.firstName} ${professor.lastName}`;
      this.academicField = professor.academicField + ' Professor';
      this.activeTabs = professor.courseList.map( (course) => {
        return {heading: course.name, items: course.surveys.map(survey => survey.name)};
      });
    });
  }

  takeSurvey() {
    alert('Coming Soon :O');
  }
}

export function onItemTap(args: ItemEventData) {
  const index = args.index;
  console.log(`Second ListView item tap ${index}`);
}
