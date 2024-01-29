import { Directive, HostBinding } from '@angular/core';
//import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

@Directive({
  selector: '[appStrikethrough]',
  standalone: true,
})
export class StrikethroughDirective {
  // TODO: Modify HTML/CSS from here  DONE

  @HostBinding('style.textDecorationLine') textDecorationLine = 'line-through';
  @HostBinding('style.fontWeight') fontWeight = 'bold';
  @HostBinding('style.fontSize') fontSize = '1vw';

  // Preguntar a claudio sobre el safestyle y el sanitizer
  //https://angular.io/api/core/Renderer2#setAttribute
  // @HostBinding('style') style: SafeStyle;
  // constructor(sanitizer: DomSanitizer) {
  //   this.style = sanitizer.bypassSecurityTrustStyle(
  //     'text-decoration-line: line-through; font-weight: bold; font-size: large;'
  //   );
  // }
}

//  text-decoration-line: line-through;
// font-weight: bold;
// font-size: large;
