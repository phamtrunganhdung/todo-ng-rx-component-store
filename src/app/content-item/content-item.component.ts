import { NgClass, NgIf } from '@angular/common';
import {
  Component,
  ElementRef,
  inject,
  Input,
  QueryList,
  Renderer2,
  ViewChildren,
} from '@angular/core';

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
  @ViewChildren('editTodo') editInput!: QueryList<
    ElementRef<HTMLButtonElement>
  >;
  idEditTodo!: string;
  toggle(id: string) {
    this.todosStore.toggle(id);
  }
  constructor(private renderer: Renderer2) {
    this.renderer.listen('window', 'click', (e: Event) => {
      const inputFocus = this.editInput.find(
        (x) => x.nativeElement.id === this.idEditTodo.toString()
      );
      if (inputFocus && e.target !== inputFocus.nativeElement) {
        this.idEditTodo = '';
        inputFocus.nativeElement.value = '';
      }
    });
  }
  removeTodo() {
    this.todosStore.removeTodo(this.item.id);
  }
  handleEditTodo(id: string) {
    this.idEditTodo = id;
    setTimeout(() => {
      const inputFocus = this.editInput.find(
        (x) => x.nativeElement.id === id.toString()
      );

      if (inputFocus) {
        inputFocus.nativeElement.focus();
        inputFocus.nativeElement.value = this.item.text;
      }
    }, 50);
  }
  handleEditStatus(text: string) {
    this.idEditTodo = '';
    const editTodo = { ...this.item };
    editTodo.text = text;
    this.todosStore.editTodo(editTodo);
  }
}
