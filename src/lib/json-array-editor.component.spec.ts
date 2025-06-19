import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JsonArrayEditorComponent } from './json-array-editor.component';

describe('JsonArrayEditorComponent', () => {
  let component: JsonArrayEditorComponent;
  let fixture: ComponentFixture<JsonArrayEditorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JsonArrayEditorComponent]
    });
    fixture = TestBed.createComponent(JsonArrayEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
