import {
  Component,
  ElementRef,
  EventEmitter,
  Injector,
  Input,
  Output
} from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Overlay } from '@angular/cdk/overlay';
import { PicklistOverlay } from '../picklist-overlay';

@Component({
  selector: 'app-picklist',
  templateUrl: './combobox.component.html'
})
export class ComboboxComponent {

  @Input() set disabled(value: boolean | string) {
    this.dis = coerceBooleanProperty(value);
  }
  @Input() hasError = false;
  @Input() label = 'Picklist';
  @Input() set options(values: object[]) {
    this.opts = values;
    for (let ind = 0; ind < values.length; ind++) {
      this.areSelected.push(false);
    }
  }
  @Input() placeholder = 'Select an Option';
  @Input() set required(value: boolean) {
    this.req = coerceBooleanProperty(value);
  }
  @Input() selection: unknown;

  @Output() selectionChange = new EventEmitter<unknown>();

  areSelected: boolean[] = [];
  dis = false;
  isOpen = false;
  prevNum = -1;
  req = false;
  opts: object[];
  picklistOverlay: PicklistOverlay;

  constructor(
    private elementRef: ElementRef,
    private overlay: Overlay,
    private injector: Injector
  ) {}

  toggleDropdown() {
    if (!this.isOpen) {
      this.isOpen = true;
      this.picklistOverlay = new PicklistOverlay(
        this.elementRef.nativeElement,
        this.overlay,
        this.injector,
        this.opts,
        this.areSelected
      );
      this.picklistOverlay.open();
      this.picklistOverlay.getPicklistDropdownRef().receiveSelection().subscribe((num) => {
        this.selection = this.opts[num]['name'];
        if (this.prevNum !== -1) {
          this.areSelected[this.prevNum] = false;
        }
        this.areSelected[num] = true;
        this.prevNum = num;
        this.selectionChange.emit(this.selection);
        this.isOpen = false;
        this.picklistOverlay.close();
      });
    } else {
      this.isOpen = false;
      this.picklistOverlay.close();
    }
  }
}
