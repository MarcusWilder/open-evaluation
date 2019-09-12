import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

@Component({
  selector: 'app-picklist',
  templateUrl: './combobox.component.html',
  styleUrls: ['./combobox.component.css']
})
export class ComboboxComponent { // Add value attr to input element
  // Also add slds-is-open class later

  @Input() set disabled(value: boolean | string) {
    this.dis = coerceBooleanProperty(value);
  }
  @Input() label: string;
  @Input() options: unknown[];
  @Input() placeholder: string;
  @Input() set required(value: boolean) {
    this.req = coerceBooleanProperty(value);
  }
  @Input() selection: unknown;

  @Output() selectionChange = new EventEmitter<unknown>();

  dis: boolean;
  req: boolean;
}
