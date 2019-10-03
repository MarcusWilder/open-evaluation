import { Component, OnInit } from '@angular/core';

import { AccordionTab } from '../types/accordion-types';
import { Button } from '@src/app/types/button-group-types';
import { Router } from '@angular/router';

import { MockdataService } from '../mockdata.service';
import { Professor } from '../objects/professor';
import { Course } from '../objects/course';

@Component({
  selector: 'app-professor-dashboard',
  templateUrl: './professor-dashboard.component.html',
  styleUrls: ['./professor-dashboard.component.css']
})
export class ProfessorDashboardComponent implements OnInit {

  constructor(private router: Router, private mockdataService: MockdataService) { }

  accordionButtons: Button[] = [
    {type: 'brand', content: 'Edit', onClick: () => this.editSurvey()},
    {type: 'destructive', content: 'Delete', onClick: () => this.deleteSurvey()}
  ];

  accordionTabs: AccordionTab[];
  activeTab: string;

  cardButtons: Button[] = [
    {type: 'success', content: 'Create Survey', onClick: () => this.router.navigate(['/create-survey'])}
  ];

  globalNavTabs = ['Home', 'Features', 'Resources'];

  professor: Professor;
  courses: Course[];

  profName: string;
  academicField: string;

  ngOnInit() {
    this.mockdataService.getProfessor().subscribe(professor => {
      this.professor = professor;
      this.courses = professor.courseList;
      this.courses.sort((a, b) => {
        return a.id - b.id;
      });
      this.profName = 'Prof. ' + professor.lastName;
      this.academicField = professor.academicField + ' Professor';
      this.accordionTabs = professor.courseList
      .map(function (course) {
        return {heading: course.name, items: course.surveys.map(survey => survey.name)};
      });
    });
  }

  deleteSurvey() {
    console.log('delete Survey');
  }

  editSurvey() {
    alert('Coming Soon :O');
  }
}
