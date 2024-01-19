import { Injectable } from '@angular/core';
import { Todo } from '../interfaces/todo';
import { TODOS } from '../../Todos-Examples';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private todoList:Todo[]=TODOS;
  

  constructor() { }

  public getTodoList(){
    return this.todoList;
  } 

  newTodo(todoForm:FormGroup):void{
    const todo:Todo=(todoForm.value);
    this.todoList.push(todo);

  }

  
}

