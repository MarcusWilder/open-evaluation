import { Component, Input } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Button } from '@src/app/types/button-group-types';

@Component({
  selector: 'app-button-group',
  templateUrl: './button-group.component.html',
  styleUrls: ['./button-group.component.css']
})
export class ButtonGroupComponent { // Will eventually need to incorporate overlay for dropdown

  @Input() set buttons(value: Button[]) {
    if (value.length > 3) {
      this.overflow = true;
      this.innerButtons = value.slice(3, value.length);
      this.outerButtons = value.slice(0, 3);
    } else {
      this.outerButtons = value;
    }

  }

  @Input() set row(value: boolean | string) {
    this.displayAsRow = coerceBooleanProperty(value);
  }

  innerButtons: Button[];
  outerButtons: Button[];
  overflow = false;
  displayAsRow = false;
}
