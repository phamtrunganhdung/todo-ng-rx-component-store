import { AsyncPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';

import { Filter } from '../models';
import { TodosStore } from '../todo.store';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [NgClass, AsyncPipe, NgIf, NgFor],
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  lstStatus: Filter[] = ['all', 'active', 'completed'];
  todoStore = inject(TodosStore);
  vm$ = this.todoStore.vm$;
  todos$ = this.todoStore.todos$;

  setFilter(filter: Filter) {
    this.todoStore.setFilter(filter);
  }

  clear() {
    this.todoStore.clear();
  }
  filterTex(text: Filter) {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }
}
