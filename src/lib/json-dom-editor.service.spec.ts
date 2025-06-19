import { TestBed } from '@angular/core/testing';

import { JsonDomEditorService } from './json-dom-editor.service';

describe('JsonDomEditorService', () => {
  let service: JsonDomEditorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JsonDomEditorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
