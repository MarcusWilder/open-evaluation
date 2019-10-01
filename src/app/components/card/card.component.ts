import { Component, Input } from '@angular/core';

import { Accordion } from '@src/app/types/accordion-types';
import { Button } from '@src/app/types/button-group-types';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html'
})
export class CardComponent {

  @Input() accordionButtons: Button[];
  @Input() cardButtons: Button[];
  @Input() set icon(value: string) {
    this.graphic = value;
    this.symbol = `/assets/icons/standard-sprite/svg/symbols.svg#${value}`;
    this.iconClass = `slds-icon-standard-${value}`;
  }
  @Input() title = 'Card';

  graphic: string;
  iconClass: string;
  sections: Accordion[] = [
    {heading: 'CS 1301'},
    {heading: 'CS 1331', items: ['Survey 1', 'Survey 2']},
    {heading: 'CS 1332', items: ['Survey 3', 'Survey 4', 'Survey 5']},
  ];
  symbol: string;
}
