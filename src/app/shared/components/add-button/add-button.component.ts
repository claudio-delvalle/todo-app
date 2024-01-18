import { Component, EventEmitter, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-add-button',
  standalone: true,
  imports: [ MatButtonModule, MatIconModule ],
  templateUrl: './add-button.component.html',
  styleUrl: './add-button.component.css'
})
export class AddButtonComponent {
  @Output() add: EventEmitter<void> = new EventEmitter();

  addClick() {
    this.add.emit();
  }
}
