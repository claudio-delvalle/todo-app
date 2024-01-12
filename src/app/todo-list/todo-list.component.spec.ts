import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoListComponent } from './todo-list.component';

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display todos', () => {
    /**
     * make sure that:
     * 1. 'todos' property is assiged
     * 2. 'todo' elements present in dom
     * 3. 'todo' elements match 'todos' property lenght
     */
    let todos;
    const host: HTMLElement = fixture.nativeElement;
    component.todos.push('first todo');
    fixture.detectChanges();
    todos = host.querySelectorAll('li');
    expect(component.todos).toBeDefined();
    expect(todos.length).toBeTruthy();
  });

  it('should display empty case', () => {
    // if 'todos' property empty
    // make sure that 'empty' message displays
    let mensaje;
    const host: HTMLElement = fixture.nativeElement;
    component.todos=[];
    fixture.detectChanges();
    mensaje=host.querySelector('.emptyTodos')?.textContent;
    expect(mensaje).toContain('Lista Vacia')
  });

  it('should display error case', () => {
    // if 'error'
    // make sure that 'error' message displays
  });
});
