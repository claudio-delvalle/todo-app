import { Component } from '@angular/core';
import { TodoListComponent } from '../../components/todo-list/todo-list.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [TodoListComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

}
