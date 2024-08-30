import { Injectable } from '@angular/core';

import { BehaviorSubject, combineLatest, of, switchMap } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

import { Filter, Todo } from './models';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private _todos = new BehaviorSubject<Todo[]>([
    {
      id: uuidv4(),
      text: 'Do exercise',
      completed: true,
    },
    {
      id: uuidv4(),
      text: 'Eat breakfast',
      completed: false,
    },
  ]);

  private _filter = new BehaviorSubject<Filter>('all');

  vm$ = combineLatest([this._todos, this._filter]).pipe(
    switchMap(([todos, filter]) => {
      let list = todos;
      switch (filter) {
        case 'active':
          list = todos.filter((x) => !x.completed);
          break;
        case 'completed':
          list = todos.filter((x) => x.completed);
          break;
      }
      return of({
        todos: list,
        filter: filter,
        numActive: todos.filter((x) => !x.completed).length,
      });
    })
  );

  toggle(todo: Todo) {
    let next = this._todos.value.map((x) => {
      if (x.id === todo.id) {
        return { ...x, completed: !x.completed };
      }
      return x;
    });
    this._todos.next(next);
  }

  addTodo(text: string) {
    let next = [
      ...this._todos.value,
      {
        id: uuidv4(),
        text: text,
        completed: false,
      },
    ];
    this._todos.next(next);
  }

  setFilter(filter: Filter) {
    this._filter.next(filter);
  }

  clear() {
    this._todos.next(this._todos.value.filter((x) => !x.completed));
  }
}
