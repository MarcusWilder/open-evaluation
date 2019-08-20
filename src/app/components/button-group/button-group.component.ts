import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button-group',
  templateUrl: './button-group.component.html'
})
export class ButtonGroupComponent { // Will eventually need to incorporate overlay for dropdown

  @Input() set buttons(value: object[]) {
    if (value.length > 3) {
      this.overflow = true;
      this.innerButtons = value.slice(3, value.length);
      this.outerButtons = value.slice(0, 3);
    } else {
      this.outerButtons = value;
    }

  }

  innerButtons: object[];
  outerButtons: object[];
  overflow = false;
}
