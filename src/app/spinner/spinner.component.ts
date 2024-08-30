import { AsyncPipe, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';

import { TodosStore } from '../todo.store';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [NgIf, AsyncPipe],
  templateUrl: './spinner.component.html',
})
export class SpinnerComponent {
  todosStore = inject(TodosStore);
  loading$ = this.todosStore.loading$;
}
