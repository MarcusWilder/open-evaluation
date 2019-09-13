import { Component, OnInit } from '@angular/core';

import { PicklistDropdownRef } from '@src/app/services/picklist-dropdown/picklist-dropdown-ref';

@Component({
  templateUrl: './picklist-dropdown.component.html',
  styleUrls: ['./picklist-dropdown.component.css']
})
export class PicklistDropdownComponent implements OnInit {
  // Add slds-is-selected and slds-has-focus later

  options: unknown[];

  constructor(private picklistDropdownRef: PicklistDropdownRef) {}

  ngOnInit() {
    this.options = this.picklistDropdownRef.options;
  }
}
