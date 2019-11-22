import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AccordionTab } from '@src/app/types/accordion-tab';
import { Button } from '@src/app/types/button';


@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  constructor(
    private http: HttpClient,
    // private toastService: ToastService
  ) {}

  accordionButtons: Button[] = [
    {type: 'brand', content: 'Edit'},
    {type: 'destructive', content: 'Delete'}
  ];
  accordionTabs: AccordionTab[] = [
    {heading: 'CS 1301'},
    {heading: 'CS 1331', items: ['Survey 1', 'Survey 2']},
    {heading: 'CS 1332', items: ['Survey 3', 'Survey 4', 'Survey 5']},
  ];
  activeTab: string;
  buttons: Button[] = [
    {type: 'destructive', content: 'Discard', onClick: () => alert('Discarded!')},
    {type: 'brand', content: 'Save' , onClick: () => alert('Saved!')},
    {type: 'success', content: 'Submit'}
  ];
  cardButtons: Button[] = [
    {type: 'success', content: 'Create Survey'}
  ];
  coursePaceOptions = ['too slow', 'about right', 'too fast'];
  firstName: string;
  lastName: string;
  mcSelection: unknown;
  options = [
    {name: 'CS 1331', header: true},
    {name: 'Survey 1', header: false},
    {name: 'Survey 2', header: false},
    {name: 'CS 1332', header: true},
    {name: 'Survey 3', header: false},
    {name: 'Survey 4', header: false},
    {name: 'Survey 5', header: false}
  ];
  rankings = [1, 2, 3, 4, 5];
  selection: unknown;
  globalNavTabs = ['Home', 'Features', 'Resources'];

  ngOnInit() {
    const log = (surveys, message) => {
      console.log(`%c ${message} `, `
        font-weight: bold;
        font-size: 24px;
        background: black;
        color: white;
      `, surveys);
      console.log(JSON.stringify(surveys, undefined, 2));
    };

    // this.http.get<Survey[]>('api/surveys')
    // .pipe(
    //   tap(data => log(data, 'THIS IS MOCK DATA')),
    //   flatMap(() => this.http.post<Survey>('api/surveys', {
    //     id: 2,
    //     name: 'New Survey With Same Questions',
    //     questionList: DEFAULT_QUESTIONS
    //   }, {
    //     headers: new HttpHeaders({
    //       'Content-Type':  'application/json',
    //     })
    //   })),
    //   flatMap(() => this.http.get<Survey[]>('api/surveys')),
    //   tap(data => log(data, 'ADDED A NEW ITEM')),
    //   flatMap(() => this.http.delete<Survey>('api/surveys/1')),
    //   flatMap(() => this.http.get<Survey[]>('api/surveys')),
    //   tap(data => log(data, 'DELETED THE FIRST ITEM')),
    // ).subscribe();
  }

  // submit() {
  //   this.toastService.open('Survey Response Received', 'Thank you for your feedback', 'success');
  // }
}
