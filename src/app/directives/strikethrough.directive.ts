import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: '[appStrikethrough]',
  standalone: true,
})
export class StrikethroughDirective {
  constructor() {}

  @HostBinding('class.strikedtrough')
  get cssClasses() {
    return true;
  }
}
