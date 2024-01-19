import { Injectable } from '@angular/core';
import { Todo } from '../interfaces/todo';
import { TODOS } from '../../Todos-Examples';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private todoList:Todo[]=TODOS;
  

  constructor() { }

  public getTodoList(){
    return this.todoList;
  } 

  newTodo ( todoDetails : { title:string, description:string, dueDate?:Date }) : void {
    const {title,description,dueDate,}=todoDetails;
    const todo = {
      title,
      description,
      dueDate,
      complete:false,
    }
    this.todoList.push(todo);

  }

  
}

