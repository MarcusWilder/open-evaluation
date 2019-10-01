import { Component } from '@angular/core';

import { Accordion } from '@src/app/types/accordion-types';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html'
})
export class CardComponent {

  sections: Accordion[] = [
    {heading: 'CS 1301'},
    {heading: 'CS 1331', items: ['Survey 1', 'Survey 2']},
    {heading: 'CS 1332', items: ['Survey 3', 'Survey 4', 'Survey 5']},
  ];
}
