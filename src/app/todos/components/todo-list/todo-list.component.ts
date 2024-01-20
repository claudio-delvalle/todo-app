import { Component, Input, OnInit } from '@angular/core';
import { TodoComponent } from '../todo/todo.component';

import { MatCardModule } from '@angular/material/card';
import { Todo } from '../../interfaces/todo.interface';
import { AddButtonComponent } from '../../../shared/components/add-button/add-button.component';
import { TodoFormComponent } from '../todo-form/todo-form.component';

import { TodoService } from '../../services/todo.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [
    TodoComponent,
    MatCardModule,
    AddButtonComponent,
    TodoFormComponent,
    HttpClientModule,
  ],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css',
})
export class TodoListComponent implements OnInit {

  @Input()
  todoList: Todo[] = [];

  isAdding = false;

  error = false;

  constructor(private todoService: TodoService) {
    this.verificarYManejarErrores(this.todoList);
  }
  ngOnInit(): void {
    this.todoService.getTodos().subscribe((todos) => (this.todoList = todos));
  }

  doneTodo(todo: Todo): void {
    this.todoService.updateTodo(todo);
  }

  todoAdd(todoDetails: {
    title: string;
    description: string;
    dueDate?: Date;
  }): void {
    const { title, description, dueDate } = todoDetails;
    //const date = dueDate?.getMonth.toString() + '-' + dueDate?.getDay.toString() + '-' + dueDate?.getFullYear.toString;
    const todoSend : Todo= {
      title,
      description,
      dueDate,
      complete: false,
    };
    this.todoService.addTodo(todoSend);
  }

  // newTodo(todoDetails: {
  //   title: string;
  //   description: string;
  //   dueDate?: Date;
  // }): void {
  //   this.todoService.newTodo(todoDetails);
  // }

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
