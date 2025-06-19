import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JsonObjectEditorComponent } from './json-object-editor.component';

describe('JsonObjectEditorComponent', () => {
  let component: JsonObjectEditorComponent;
  let fixture: ComponentFixture<JsonObjectEditorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JsonObjectEditorComponent]
    });
    fixture = TestBed.createComponent(JsonObjectEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
