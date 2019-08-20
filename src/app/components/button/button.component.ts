import { Component, Input } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { ButtonType } from '@src/app/types/button-types';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html'
})
export class ButtonComponent {

  @Input() content = 'Button';

  @Input() set disabled(value: boolean | string) {
    this.dis = coerceBooleanProperty(value);
  }
  @Input() set icon(value: string) {
    this.symbol = `/assets/icons/utility-sprite/svg/symbols.svg#${value}`;
  }
  @Input() set hasIconBody(value: boolean | string) {
    this.hasIBod = coerceBooleanProperty(value);
  }
  @Input() set type(value: ButtonType) {
    this.variation = `slds-button_${value}`;
  }

  dis: boolean;
  hasIBod = false;
  symbol: string;
  variation: string;
}
