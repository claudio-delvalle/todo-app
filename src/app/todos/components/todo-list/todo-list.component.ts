import { Component, Input } from '@angular/core';
import { TodoComponent } from '../todo/todo.component';

import { MatCardModule } from '@angular/material/card';
import { Todo } from '../../interfaces/todo';
import { AddButtonComponent } from '../../../shared/components/add-button/add-button.component';
import { TodoFormComponent } from '../todo-form/todo-form.component';

import { TodoService } from '../../services/todo.service';


@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [
    TodoComponent,
    MatCardModule,
    AddButtonComponent,
    TodoFormComponent,
  ],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css',
})
export class TodoListComponent {
  @Input()
  todoList: Todo[] = [];

  isAdding = false;

  error = false;

  constructor(private todoService: TodoService) {
    this.verificarYManejarErrores(this.todoList);
  }

  newTodo(todoDetails: {
    title: string;
    description: string;
    dueDate?: Date;
  }): void {
    this.todoService.newTodo(todoDetails);
  }

  verificarYManejarErrores(lista: unknown[]): void {
    try {
      this.verificarLista(lista);
      this.error = false;
    } catch {
      this.error = true;
    }
  }

  verificarLista(lista: unknown[]): void {
    for (const elemento of lista) {
      if (typeof elemento !== 'string') {
        throw new TypeError(
          'Todos los elementos de la lista deben ser strings'
        );
      }
    }
  }
}
