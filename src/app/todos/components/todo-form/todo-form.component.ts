import { Component, Output,EventEmitter } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { AddButtonComponent } from '../../../shared/components/add-button/add-button.component';

import { Validators } from '@angular/forms';



@Component({
  selector: 'app-todo-form',
  standalone: true,
  imports: [ ReactiveFormsModule, MatInputModule, AddButtonComponent],
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
      title: new FormControl('',[Validators.minLength(5),Validators.required]),
      description: new FormControl('',Validators.maxLength(25)),
      dueDate: new FormControl('',Validators.required), // TODO: Make type 'Date' (use DatePicker)
      complete: new FormControl(false)
    });

    this.todoForm.valueChanges.subscribe(values => console.log(values));
  }

  @Output()
  public newTodo:EventEmitter<FormGroup>=new EventEmitter;


  emitTodo():void{
    this.newTodo.emit(this.todoForm);
    this.todoForm.reset(); 
  }



}
