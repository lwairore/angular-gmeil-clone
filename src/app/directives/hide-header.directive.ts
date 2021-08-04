import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[appHideHeader]'
})
export class HideHeaderDirective {
  @Input('appHideHeader') header: any;

  constructor() { }

}

/**
 ** We need to store the last Y position within `saveY`
 * to notice in which direction we scroll
 ** When we notice that we changed directions,
 * we store that exact position inside `previousY`
 * so we can use it for our caluclation
 ** We will change the `top` and `opacity`
 * properties of our search bar
 ** The `scrollDistance` is the value at which
 * the element will be gone completely,
 * so the position is between 0 and -50, while the opacity is between 0 and 1
 */