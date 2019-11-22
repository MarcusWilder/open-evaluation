import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

@Component({
  selector: 'app-radio-group',
  templateUrl: './radio-group.component.html'
})
export class RadioGroupComponent  {

  @Input() label = 'Radio Group Label';
  @Input() hasError = false;
  @Input() options: unknown[];
  @Input() selection: number;
  @Input() radioGroupID: string;

  @Input() set disabled(value: boolean | string) {
    this._disabled = coerceBooleanProperty(value);
  }
  @Input() set required(value: boolean | string) {
    this.req = coerceBooleanProperty(value);
  }
  @Output() selectionChange = new EventEmitter<number>();

  _disabled: boolean;
  req: boolean;

  makeSelection(selection: number) {
    this.selectionChange.emit(selection);
  }
}
