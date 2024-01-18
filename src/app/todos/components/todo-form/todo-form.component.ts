import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-todo-form',
  standalone: true,
  imports: [ ReactiveFormsModule, MatInputModule ],
  templateUrl: './todo-form.component.html',
  styleUrl: './todo-form.component.css'
})
export class TodoFormComponent {
  todoForm: FormGroup;
  // TODO: Add output that emits a new Todo
  // TODO: Add validations to form fields
  // TODO: Add submit btn to form (or submit on enter)
  // TODO: Add inline mat-errors when validation errors occur
  constructor() {
    this.todoForm = new FormGroup({
      title: new FormControl(''),
      description: new FormControl(''),
      dueDate: new FormControl('') // TODO: Make type 'Date' (use DatePicker)
    });

    this.todoForm.valueChanges.subscribe(values => console.log(values));
  }
}
