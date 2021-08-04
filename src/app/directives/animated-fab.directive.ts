import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[appAnimatedFab]'
})
export class AnimatedFabDirective {
  @Input('appAnimatedFab') fab: any;

  constructor() { }

}
