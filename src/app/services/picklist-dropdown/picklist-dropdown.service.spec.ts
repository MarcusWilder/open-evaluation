import { TestBed } from '@angular/core/testing';

import { PicklistDropdownService } from './picklist-dropdown.service';

xdescribe('PicklistDropdownService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PicklistDropdownService = TestBed.get(PicklistDropdownService);
    expect(service).toBeTruthy();
  });
});
