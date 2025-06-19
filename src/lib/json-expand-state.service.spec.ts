import { TestBed } from '@angular/core/testing';

import { JsonExpandStateService } from './json-expand-state.service';

describe('JsonExpandStateService', () => {
  let service: JsonExpandStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JsonExpandStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
