import { Injectable } from '@angular/core';
import { Todo } from '../../interfaces/todo.interface';

import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { environments } from '../../../../environments/environments';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private baseUrl: string = environments.baseUrl;

  constructor(private http: HttpClient) {}

  getLiveTodo(socketService: Socket) {
    return socketService.fromEvent('new todo');
  }

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${this.baseUrl}/todos`);
  }

  addTodo(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(`${this.baseUrl}/todos`, todo);
  }

  updateTodo(todo: Todo): Observable<Todo> {
    if (!todo._id) throw Error('Hero id is required');
    return this.http.put<Todo>(`${this.baseUrl}/todos/${todo._id}`, todo);
  }

  deleteTodoById(id: string): Observable<boolean> {
    return this.http.delete(`${this.baseUrl}/todos/${id}`).pipe(
      catchError((err) => {
        console.error('Hubo un error al eliminar el todo:', err);
        return of(false);
      }),
      map((resp) => {
        console.log('Respuesta del servidor:', resp);
        return true;
      })
    );
  }
}
