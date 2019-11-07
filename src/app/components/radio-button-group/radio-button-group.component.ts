import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

@Component({
  selector: 'app-radio-button-group',
  templateUrl: './radio-button-group.component.html'
})
export class RadioButtonGroupComponent {

  @Input() label = 'Radio Button Group';
  @Input() hasError = false;
  @Input() options: unknown[];
  @Input() selection: number;
  @Input() radioButtonGroupID: string;

  @Input() set disabled(value: boolean | string) {
    this.dis = coerceBooleanProperty(value);
  }
  @Input() set required(value: boolean | string) {
    this.req = coerceBooleanProperty(value);
  }
  @Output() selectionChange = new EventEmitter<unknown>();

  dis: boolean;
  req: boolean;

  makeSelection(selection: unknown) {
    this.selectionChange.emit(selection);
  }
}
