import { TestBed } from '@angular/core/testing';

import { MockdataService } from './mockdata.service';

describe('MockdataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MockdataService = TestBed.get(MockdataService);
    expect(service).toBeTruthy();
  });
});
