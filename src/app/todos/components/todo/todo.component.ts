import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { Todo } from '../../interfaces/todo';
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
  public done: EventEmitter<boolean> = new EventEmitter();

  todoDone(): void{
    this.done.emit(true);
    this.toStrike = true;
  }
}
