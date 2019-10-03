import { Component, Input } from '@angular/core';

import { Button } from '@src/app/types/button-group-types';
import { AccordionTab } from '@src/app/types/accordion-types';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html'
})
export class AccordionComponent {

  @Input() buttons: Button[];
  @Input() set tabs(collection: AccordionTab[]) {
    this.tabCollection = collection;
    for (let ind = 0; ind < collection.length; ind++) {
      this.areOpen.push(false);
    }
  }

  areOpen: boolean[] = [];
  tabCollection: object[];

  toggleTab(ind: number) {
    this.areOpen[ind] = !this.areOpen[ind];
  }
}
