import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.css']
})
export class CheckboxComponent implements OnInit {
  
  _checked: boolean = false;

  constructor() { }

  @Input() label: string;

  @Input() set checked(value: any) {
    this._checked = coerceBooleanProperty(value);
  }

  @Output() checkedChange = new EventEmitter<boolean>();

  emitValue() {
    this.checkedChange.emit(this._checked);
  }

  ngOnInit() {
  }

}
