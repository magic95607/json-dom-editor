import { Component, Input, Output, EventEmitter } from '@angular/core';
import { JsonObjectEditorComponent } from './json-object-editor.component';
import { JsonArrayEditorComponent } from './json-array-editor.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

type ValueType = 'string' | 'number' | 'boolean' | 'object' | 'array' | 'null';

@Component({
    selector: 'app-json-dom-editor',
    templateUrl: './json-dom-editor.component.html',
    styleUrls: ['./json-dom-editor.component.scss'],
    imports: [
        CommonModule,
        FormsModule,
        JsonObjectEditorComponent,
        JsonArrayEditorComponent
    ],
    standalone: true
})
export class JsonDomEditorComponent {
    @Input() value: any;
    @Input() path: string = '';
    @Output() valueChange = new EventEmitter<any>();
    @Output() navigate = new EventEmitter<string>();
    @Output() enterChild = new EventEmitter<string>();

    isMobile = window.innerWidth <= 600;

    constructor() {
        window.addEventListener('resize', () => {
            this.isMobile = window.innerWidth <= 600;
        });
    }

    onEnterChild(keyOrIndex: string) {
        const newPath = this.path ? `${this.path}.${keyOrIndex}` : keyOrIndex;
        this.enterChild.emit(newPath);
    }

    navigateTo(index: number) {
        const segs = this.path.split('.').slice(0, index + 1);
        this.navigate.emit(segs.join('.'));
    }

    valueTypes: ValueType[] = ['string', 'number', 'boolean', 'object', 'array', 'null'];

    getValueType(val: any): ValueType {
        if (val === null) return 'null';
        if (Array.isArray(val)) return 'array';
        if (typeof val === 'object') return 'object';
        if (typeof val === 'number') return 'number';
        if (typeof val === 'boolean') return 'boolean';
        return 'string';
    }

    setType(type: ValueType) {
        let newValue: any;
        switch (type) {
            case 'string':
                newValue = '';
                break;
            case 'number':
                newValue = 0;
                break;
            case 'boolean':
                newValue = false;
                break;
            case 'object':
                newValue = {};
                break;
            case 'array':
                newValue = [];
                break;
            case 'null':
                newValue = null;
                break;
        }
        console.log(newValue);
        this.valueChange.emit(newValue);
    }

    onObjectChange(val: any) {
        this.valueChange.emit(val);
    }

    onArrayChange(val: any) {
        this.valueChange.emit(val);
    }

    onPrimitiveChange(val: any) {
        this.valueChange.emit(val);
    }
}
