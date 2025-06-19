import { Component, Input, Output, EventEmitter, forwardRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JsonDomEditorComponent } from './json-dom-editor.component';
import { FormsModule } from '@angular/forms';
import { JsonExpandStateService } from './json-expand-state.service';

type ValueType = 'string' | 'number' | 'boolean' | 'object' | 'array' | 'null';

@Component({
  selector: 'app-json-object-editor',
  templateUrl: './json-object-editor.component.html',
  styleUrls: [
    './json-object-editor.component.scss',
    './json-dom-editor.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    forwardRef(() => JsonDomEditorComponent)
  ],
  standalone: true
})
export class JsonObjectEditorComponent {
  @Input() obj: any = {};
  @Input() path: string = '';
  @Output() objChange = new EventEmitter<any>();
  @Output() enterChild = new EventEmitter<string>();
  isObjectOrArray(val: any) {
    return typeof val === 'object' && val !== null;
  }

  private expandState = inject(JsonExpandStateService)

  get keys(): string[] {
    return Object.keys(this.obj);
  }

  toggleExpand(key: string) {
    const pathKey = this.path ? this.path + '.' + key : key;
    this.expandState.toggle(pathKey);
  }
  isExpanded(key: string): boolean {
    const pathKey = this.path ? this.path + '.' + key : key;
    return this.expandState.isExpanded(pathKey);
  }

  // 新增欄位狀態
  addingKey = false;
  newKey = '';
  newType: ValueType = 'string';
  valueTypes: ValueType[] = ['string', 'number', 'boolean', 'object', 'array', 'null'];

  startAddKey() {
    this.addingKey = true;
    this.newKey = '';
    this.newType = 'string';
    setTimeout(() => {
      const el = document.getElementById('new-key-input');
      if (el) (el as HTMLInputElement).focus();
    });
  }

  confirmAddKey() {
    const key = this.newKey.trim();
    if (!key || this.obj.hasOwnProperty(key)) return;
    this.obj[key] = this.getDefaultValue(this.newType);
    this.objChange.emit({ ...this.obj });
    this.addingKey = false;
    this.newKey = '';
  }

  cancelAddKey() {
    this.addingKey = false;
    this.newKey = '';
  }

  getDefaultValue(type: ValueType): any {
    switch (type) {
      case 'string': return '';
      case 'number': return 0;
      case 'boolean': return false;
      case 'object': return {};
      case 'array': return [];
      case 'null': return null;
    }
  }

  deleteKey(key: string) {
    delete this.obj[key];
    this.objChange.emit({ ...this.obj });
  }

  renameKey(oldKey: string, newKey: string) {
    if (!newKey || oldKey === newKey || this.obj.hasOwnProperty(newKey)) return;
    this.obj[newKey] = this.obj[oldKey];
    delete this.obj[oldKey];
    this.objChange.emit({ ...this.obj });
  }

  onValueChange(key: string, val: any) {
    this.obj[key] = val;
    this.objChange.emit({ ...this.obj });
  }

  expandedKeys: Record<string, boolean> = {};
}