import { Component, Output, EventEmitter } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { AddButtonComponent } from '../../../shared/components/add-button/add-button.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { Validators } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';

import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-todo-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    AddButtonComponent,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
  ],
  templateUrl: './todo-form.component.html',
  styleUrl: './todo-form.component.css',
})
export class TodoFormComponent {
  todoForm: FormGroup;
  today = new Date();

  @Output()
  public newTodo: EventEmitter<{
    title: string;
    description: string;
    dueDate?: Date;
  }> = new EventEmitter();

  // TODO: Add output that emits a new Todo DONE

  // TODO: Add validations to form fields. DONE

  // TODO: Add submit btn to form (or submit on enter) DONE

  // TODO: Add inline mat-errors when validation errors occur DONE
  constructor() {
    this.todoForm = new FormGroup(
      {
      title: new FormControl('', [
        Validators.minLength(5),
        Validators.required,
      ]),
      description: new FormControl('', Validators.maxLength(20)),
      dueDate: new FormControl(''), // TODO: Make type 'Date' (use DatePicker) DONE
      }
    );
    this.todoForm.valueChanges.subscribe((values) => console.log(values));
  }

  emitTodo(): void
  {
    this.newTodo.emit(this.todoForm.value);
    this.todoForm.reset();    
  }
}
