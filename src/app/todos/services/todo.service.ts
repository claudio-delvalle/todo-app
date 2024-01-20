import { Injectable } from '@angular/core';
import { Todo } from '../interfaces/todo.interface';
import { TODOS } from '../../Todos-Examples';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environments } from '../../../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private todoList: Todo[] = TODOS;

  private baseUrl: string = environments.baseUrl;

  constructor(private http:HttpClient) {}

  getTodos(): Observable<Todo[]>{
    return this.http.get<Todo[]>(`${this.baseUrl}/todos`);
    }








  public getTodoList() {
    return this.todoList;
  }


  newTodo(todoDetails: {
    title: string;
    description: string;
    dueDate?: Date;
  }): void {
    const { title, description, dueDate } = todoDetails;
    const todo = {
      title,
      description,
      dueDate,
      complete: false,
    };
    this.todoList.push(todo);
  }

  doneTodo(id: string): void {
    id.split;
  }
}
