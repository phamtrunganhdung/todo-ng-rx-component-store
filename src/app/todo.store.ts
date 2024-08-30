import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ImmerComponentStore } from 'ngrx-immer/component-store';
import { delay, of, switchMap } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

import { tapResponse } from '@ngrx/operators';

import { Filter, Todo } from './models';

// type TodosState = {
//   todos: Todo[];
//   filter: Filter;
// };

const initialState = {
  todos: [] as Todo[],
  filter: 'all' as Filter,
  loading: false,
};
type TodosState = typeof initialState;

@Injectable()
export class TodosStore extends ImmerComponentStore<TodosState> {
  readonly todos$ = this.select((state) => state.todos);
  readonly filter$ = this.select((state) => state.filter);
  readonly loading$ = this.select((state) => state.loading);

  readonly vm$ = this.select(this.todos$, this.filter$, (todos, filter) => {
    let list = todos;
    switch (filter) {
      case 'active':
        list = todos.filter((x) => !x.completed);
        break;
      case 'completed':
        list = todos.filter((x) => x.completed);
        break;
    }
    return {
      todos: list,
      filter: filter,
      numActive: todos.filter((x) => !x.completed).length,
      isCompletedAll: todos.filter((x) => !x.completed).length,
    };
  });

  constructor() {
    super(initialState);
    // {
    //   id: uuidv4(),
    //   text: 'Do exercise',
    //   completed: true,
    // },
    // {
    //   id: uuidv4(),
    //   text: 'Eat breakfast',
    //   completed: false,
    // }
  }

  readonly getTodos = this.effect((trigger$) => {
    this.patchState({
      loading: true,
    });
    return trigger$.pipe(
      delay(3000),
      switchMap(() =>
        of([
          {
            id: uuidv4(),
            text: 'Eat breakfast',
            completed: false,
          },

          {
            id: uuidv4(),
            text: 'Eat breakfast',
            completed: false,
          },
          {
            id: uuidv4(),
            text: 'Do homework',
            completed: false,
          },
          {
            id: uuidv4(),
            text: 'Play billiard',
            completed: false,
          },
        ])
      ),
      tapResponse({
        next: (data) => {
          this.patchState((state) => ({
            todos: [...state.todos, ...data],
            loading: false,
          }));
        },
        error: (error: HttpErrorResponse) => {
          console.log(error.message);
          this.patchState({ loading: false });
        },
      })
      // tap((data) => {
      //   this.patchState((state) => ({
      //     loading: false,
      //     todos: data,
      //   }));
      // })
    );
  });

  readonly addTodo = this.updater((state, text: string) => {
    state.todos.push({
      id: uuidv4(),
      text: text,
      completed: false,
    });
  });
  readonly toggleAll = this.updater((state, isComplete: boolean) => {
    state.todos = [
      ...state.todos.map((x) => ({ ...x, completed: isComplete })),
    ];
  });

  readonly removeTodo = this.updater((state, id: string) => {
    state.todos = [...state.todos.filter((x) => x.id !== id)];
  });

  readonly toggle = this.updater((state, id: string) => {
    const index = state.todos.findIndex((x) => x.id === id);
    if (index >= 0) {
      state.todos[index].completed = !state.todos[index].completed;
    }
  });

  readonly setFilter = this.updater((state, filter: Filter) => {
    state.filter = filter;
  });

  readonly clear = this.updater((state) => {
    state.todos = state.todos.filter((x) => !x.completed);
  });

  // readonly addTodo = this.updater((state, text: string) => ({
  //   ...state,
  //   todos: [
  //     ...state.todos,
  //     {
  //       id: uuidv4(),
  //       text: text,
  //       completed: false,
  //     },
  //   ],
  // }));

  // addTodo(text: string) {
  //   this.patchState((state) => {
  //     state.todos.push({
  //       id: uuidv4(),
  //       text: text,
  //       completed: false,
  //     });
  //     // return ({
  //     //   todos: [
  //     //     ...state.todos,
  //     //     {
  //     //       id: uuidv4(),
  //     //       text: text,
  //     //       completed: false,
  //     //     },
  //     //   ],
  //     // });
  //   });
  // }
}
