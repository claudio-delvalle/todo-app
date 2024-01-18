import { Component, Input } from '@angular/core';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { Todo } from '../../interfaces/todo';


@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [MatCheckboxModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css'
})
export class TodoComponent {

  @Input()
  public todo?:Todo;

}
