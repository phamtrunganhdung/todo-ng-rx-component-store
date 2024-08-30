import { AsyncPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';

import { ContentItemComponent } from '../content-item/content-item.component';
import { SpinnerComponent } from '../spinner/spinner.component';
import { TodosStore } from '../todo.store';

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    NgClass,
    SpinnerComponent,
    AsyncPipe,
    ContentItemComponent,
  ],
  templateUrl: './content.component.html',
})
export class ContentComponent implements OnInit {
  todosStore = inject(TodosStore);
  vm$ = this.todosStore.vm$;
  // vm: {
  //   todos: Todo[];
  //   filter: Filter;
  //   numActive: number;
  // } = { todos: [], filter: 'all', numActive: 0 };

  // ngOnInit(): void {
  //   this.vm$
  //     .pipe(
  //       tap((data) => {
  //         this.vm = data;
  //       })
  //     )
  //     .subscribe();
  // }

  ngOnInit(): void {
    this.todosStore.getTodos();
  }
}
