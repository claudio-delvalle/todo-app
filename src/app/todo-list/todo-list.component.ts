import { NgIf } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [NgIf],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css'
})
export class TodoListComponent {
  todos: string[] = [];

  onEmptyTodos(){

  }
}
