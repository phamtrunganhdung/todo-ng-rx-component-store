import { AsyncPipe, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { TodosStore } from '../todo.store';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule, NgIf, AsyncPipe],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  todosStore = inject(TodosStore);
  text = '';
  vm$ = this.todosStore.vm$;
  todos$ = this.todosStore.todos$;

  addTodo() {
    if (!this.text) return;

    this.todosStore.addTodo(this.text);
    this.text = '';
  }
  toggleAll(isComplete: boolean) {
    this.todosStore.toggleAll(isComplete);
  }
}
