import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html'
})
export class InputComponent { // Add field level help functionality

  @Input() hasError = false;
  @Input() label = 'Input';
  @Input() placeholder = 'Enter Input';
  @Input() type = 'text';

  @Input() set disabled(value: boolean | string) {
    this.dis = coerceBooleanProperty(value);
  }
  @Input() set entry(value: string) {
    if (!value) { return; }

    this.ent = value.trim();
  }
  @Input() set required(value: boolean | string) {
    this.req = coerceBooleanProperty(value);
  }
  @Output() entryChange = new EventEmitter<string>();

  dis: boolean;
  ent: string;
  req: boolean;

  makeEntry() {
    if (this.ent === undefined || !this.ent.trim()) {
      this.ent = undefined;
      this.entryChange.emit(undefined);
    } else {
      this.entryChange.emit(this.ent.trim());
    }
  }
}
