import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { Todo } from '../../interfaces/todo.interface';
import { StrikethroughDirective } from '../../../directives/strikethrough.directive';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [
    MatCheckboxModule,
    MatCardModule,
    StrikethroughDirective,
    CommonModule,
  ],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css',
})
export class TodoComponent implements OnInit {
  @Input()
  public todo?: Todo;

  @Output()
  public done: EventEmitter<Todo> = new EventEmitter();

  ngOnInit(): void {
    console.log(this.todo?.dueDate instanceof Date);
    //console.log(this.todo?.dueDate?.toISOString().slice(0, 10));
  }

  todoDone(): void {
    if (this.todo?.complete === false) {
      this.todo.complete = true;
      this.done.emit(this.todo);
    } else if (this.todo?.complete === true) {
      this.todo.complete = false;
      this.done.emit(this.todo);
    }
  }
}
