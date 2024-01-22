import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: '[appStrikethrough]',
  standalone: true,
})
export class StrikethroughDirective {

  // TODO: Modify HTML/CSS from here
  @HostBinding('class.strikedtrough')
  get cssClasses() {
    return true;
  }
}
