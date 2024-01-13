import { Component } from '@angular/core';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css'
})
export class TodoListComponent {
  todos: any[] = [];
  error:boolean=false;
  
  constructor(){
    try{
      this.verificarLista(this.todos);
      this.error=false;
    }
    catch{
      this.error=true;
    }
  }
  verificarLista(lista: any[]): void {
    for (let elemento of lista) {
      if (typeof elemento !== 'string') {
        throw new TypeError('Todos los elementos de la lista deben ser strings');
      }
    }
  }
}
