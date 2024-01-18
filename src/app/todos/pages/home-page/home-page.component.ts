import { Component } from '@angular/core';
import { TodoListComponent } from '../../components/todo-list/todo-list.component';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../interfaces/todo';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [TodoListComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

  constructor(private todoService:TodoService){}

  get todoList():Todo[]{
  return this.todoService.getTodoList();  
  }
}
