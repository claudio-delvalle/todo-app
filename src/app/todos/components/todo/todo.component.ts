import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { Todo } from '../../interfaces/todo.interface';
import { StrikethroughDirective } from '../../../directives/strikethrough.directive';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [MatCheckboxModule, MatCardModule, StrikethroughDirective],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css',
})
export class TodoComponent {
  public toStrike = false;

  @Input()
  public todo?: Todo;

  @Output()
  public done: EventEmitter<Todo> = new EventEmitter();

  todoDone(): void {
    if (this.todo?.complete === false) {
      this.todo.complete = true;
      this.done.emit(this.todo);
      this.toStrike = true;
    } else if (this.todo?.complete === true) {
      this.toStrike = false;
      this.todo.complete = false;
      this.done.emit(this.todo);
    }
  }
}
