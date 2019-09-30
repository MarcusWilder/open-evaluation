import { Component, OnInit } from '@angular/core';

import { PicklistDropdownRef } from '@src/app/components/picklist/picklist-dropdown-ref';

@Component({
  templateUrl: './picklist-dropdown.component.html'
})
export class PicklistDropdownComponent implements OnInit {

  options: object[];
  areSelected: boolean[];

  constructor(
    private picklistDropdownRef: PicklistDropdownRef
  ) {}

  ngOnInit() {
    this.options = this.picklistDropdownRef.options;
    this.areSelected = this.picklistDropdownRef.areSelected;
  }

  select(num: number) {
    if (this.options[num]['header']) { return; }

    this.picklistDropdownRef.sendSelection(num);
  }
}
