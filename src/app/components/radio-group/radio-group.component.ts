import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

@Component({
  selector: 'app-radio-group',
  templateUrl: './radio-group.component.html',
  styleUrls: ['./radio-group.component.css']
})
export class RadioGroupComponent  {

  @Input() label = 'Radio Group Label';
  @Input() hasError = false;
  @Input() options: unknown[];
  @Input() selection: unknown;
  @Input() radioGroupID: string;

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
