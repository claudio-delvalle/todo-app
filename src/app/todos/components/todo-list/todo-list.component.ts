import { Component, OnInit } from '@angular/core';
import { TodoComponent } from '../todo/todo.component';

import { MatCardModule } from '@angular/material/card';
import { Todo } from '../../interfaces/todo.interface';
import { AddButtonComponent } from '../../../shared/components/add-button/add-button.component';
import { TodoFormComponent } from '../todo-form/todo-form.component';

import { TodoService } from '../../services/todo/todo.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { SocketService } from '../../services/socket/SocketService.service';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [
    TodoComponent,
    MatCardModule,
    AddButtonComponent,
    TodoFormComponent,
    HttpClientModule,
    CommonModule,
  ],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css',
})
export class TodoListComponent implements OnInit {
  todos$: Observable<Todo[]> = this.todoService.getTodos();

  isAdding = false;

  error = false;

  constructor(
    private todoService: TodoService,
    private socketService: SocketService
  ) {}

  ngOnInit(): void {
    this.todos$.subscribe((todos) => {
      if (todos.length > 0) this.verificarYManejarErrores(todos);
    });
  }

  AfterViewInit(): void {
    const socket = this.socketService.initSocket();
    this.todoService.getLiveTodo(socket).subscribe((value: unknown) => {
      const liveTodo = value as Todo;
      this.todoService.addTodo(liveTodo);
      this.todos$ = this.todoService.getTodos();
    });
  }

  getTodos(): void {
    this.todos$ = this.todoService.getTodos();
  }

  doneTodo(todo: Todo): void {
    this.todoService.updateTodo(todo).subscribe();
  }

  todoAdd(todoDetails: {
    title: string;
    description: string;
    dueDate?: Date;
  }): void {
    const { title, description, dueDate } = todoDetails;
    const todoSend: Todo = {
      title,
      description,
      dueDate,
      complete: false,
    };
    this.todoService.addTodo(todoSend).subscribe((todo) => console.log(todo)); // TODO: Avoid updating property with result
    this.isAdding = false;
    this.todos$.subscribe((todos) => {
      if (todos.length > 0) this.verificarYManejarErrores(todos);
    });
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
