import { Component } from '@angular/core';

import { Accordion } from '@src/app/types/accordion-types';
import { ToastService } from '@src/app/services/toast/toast.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent {

  constructor(private toastService: ToastService) {}

  activeTab: string;
  buttons: object[] = [
    {type: 'destructive', content: 'Discard' },
    {type: 'brand', content: 'Save' },
    {type: 'success', content: 'Submit' }
  ];
  firstName: string;
  lastName: string;
  rankings: number[]  = [1, 2, 3, 4, 5];
  sections: Accordion[] = [
    {heading: 'CS 1301'},
    {heading: 'CS 1331', items: ['Survey 1', 'Survey 2']},
    {heading: 'CS 1332', items: ['Survey 3', 'Survey 4', 'Survey 5']},
  ];
  selection: unknown;
  tabs: string[] = ['Home', 'Features', 'Resources'];

  // submit() {
  //   this.toastService.open('Survey Response Received', 'Thank you for your feedback', 'success');
  // }
}
