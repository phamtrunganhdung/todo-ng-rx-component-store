import { NgClass, NgIf } from '@angular/common';
import { Component, inject, Input } from '@angular/core';

import { Todo } from '../models';
import { TodosStore } from '../todo.store';

@Component({
  selector: 'app-content-item',
  standalone: true,
  imports: [NgClass, NgIf],
  templateUrl: './content-item.component.html',
})
export class ContentItemComponent {
  private todosStore = inject(TodosStore);
  @Input() item!: Todo;
  toggle(id: string) {
    this.todosStore.toggle(id);
  }
  removeTodo(id: string) {
    this.todosStore.removeTodo(id);
  }
}
