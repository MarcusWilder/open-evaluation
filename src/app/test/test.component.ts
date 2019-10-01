import { Component } from '@angular/core';

import { AccordionTab } from '../types/accordion-types';
import { Button } from '@src/app/types/button-group-types';
import { ToastService } from '@src/app/services/toast/toast.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent {

  constructor(
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
    {type: 'success', content: 'Creaete Survey'}
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

  // submit() {
  //   this.toastService.open('Survey Response Received', 'Thank you for your feedback', 'success');
  // }
}
