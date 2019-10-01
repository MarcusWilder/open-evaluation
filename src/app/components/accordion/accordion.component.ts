import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html'
})
export class AccordionComponent {

  @Input() set tabs(collection: object[]) {
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
