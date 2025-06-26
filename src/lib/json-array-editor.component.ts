import { Component, Input, Output, EventEmitter, forwardRef, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JsonDomEditorComponent } from './json-dom-editor.component';
import { FormsModule } from '@angular/forms';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-json-array-editor',
  templateUrl: './json-array-editor.component.html',
  styleUrls: [
    './json-array-editor.component.scss',
    './json-dom-editor.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    DragDropModule,
    forwardRef(() => JsonDomEditorComponent)
  ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class JsonArrayEditorComponent {
  @Input() arr: any[] = [];
  @Input() path: string = '';
  @Output() arrChange = new EventEmitter<any[]>();
  isMobile = window.innerWidth <= 600;
  @Output() enterChild = new EventEmitter<string>();
  // 當物件/陣列欄位被點擊時
  isObjectOrArray(val: any) {
    return typeof val === 'object' && val !== null;
  }

  onEnterChild(newPath: string) {
    this.enterChild.emit(newPath);
  }

  constructor() {
    window.addEventListener('resize', () => {
      this.isMobile = window.innerWidth <= 600;
    });
  }

  addItem(type: 'string' | 'number' | 'boolean' | 'object' | 'array' | 'null' = 'string') {
    let value: any;
    switch (type) {
      case 'string': value = ''; break;
      case 'number': value = 0; break;
      case 'boolean': value = false; break;
      case 'object': value = { __id: this.generateId() }; break;
      case 'array': value = []; break;
      case 'null': value = null; break;
      default: value = '';
    }
    this.arr.push(value);
    this.arrChange.emit([...this.arr]);
  }

  private idCounter = 0;
  private generateId() {
    return ++this.idCounter;
  }

  trackByItem(index: number, item: any) {
    return item && item.__id ? item.__id : index;
  }

  deleteItem(idx: number) {
    this.arr.splice(idx, 1);
    this.arrChange.emit([...this.arr]);
  }

  moveItem(from: number, to: number) {
    if (to < 0 || to >= this.arr.length) return;
    const arr = [...this.arr];
    const [item] = arr.splice(from, 1);
    arr.splice(to, 0, item);
    this.arr = arr;
    this.arrChange.emit(this.arr);
  }

  onValueChange(idx: number, val: any) {
    this.arr[idx] = val;
    this.arrChange.emit([...this.arr]);
  }

  drop(event: CdkDragDrop<any[]>) {
    moveItemInArray(this.arr, event.previousIndex, event.currentIndex);
    this.arrChange.emit([...this.arr]);
  }
}