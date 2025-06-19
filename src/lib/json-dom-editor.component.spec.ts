import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JsonDomEditorComponent } from './json-dom-editor.component';

describe('JsonDomEditorComponent', () => {
  let component: JsonDomEditorComponent;
  let fixture: ComponentFixture<JsonDomEditorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JsonDomEditorComponent]
    });
    fixture = TestBed.createComponent(JsonDomEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
