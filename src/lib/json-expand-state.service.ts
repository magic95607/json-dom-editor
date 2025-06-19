import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class JsonExpandStateService {
  private expandedMap = new Map<string, boolean>();

  setExpanded(path: string, expanded: boolean) {
    this.expandedMap.set(path, expanded);
  }

  isExpanded(path: string): boolean {
    return !!this.expandedMap.get(path);
  }

  toggle(path: string) {
    this.setExpanded(path, !this.isExpanded(path));
  }
}