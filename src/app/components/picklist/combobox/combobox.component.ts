import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

import { PicklistDropdownService } from '@src/app/services/picklist-dropdown/picklist-dropdown.service';

@Component({
  selector: 'app-picklist',
  templateUrl: './combobox.component.html',
  styleUrls: ['./combobox.component.css']
})
export class ComboboxComponent {
  // Add value attr to input element
  // Might need to change <input> to <button> in template

  @Input() set disabled(value: boolean | string) {
    this.dis = coerceBooleanProperty(value);
  }
  @Input() label = 'Picklist';
  @Input() options: unknown[];
  @Input() placeholder = 'Select an Option';
  @Input() set required(value: boolean) {
    this.req = coerceBooleanProperty(value);
  }
  @Input() selection: unknown;

  @Output() selectionChange = new EventEmitter<unknown>();

  dis = false;
  isOpen = false;
  req = false;

  constructor(
    private elementRef: ElementRef,
    private picklistDropdownService: PicklistDropdownService
  ) {}

  toggleDropdown() {
    if (this.isOpen) {
      this.isOpen = false;
      this.picklistDropdownService.close();
    } else {
      this.isOpen = true;
      this.picklistDropdownService.open(this.elementRef, this.options);
    }
  }
}
