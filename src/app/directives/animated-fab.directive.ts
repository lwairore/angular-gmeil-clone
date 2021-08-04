import { Directive, Input } from '@angular/core';
import { AnimationController } from '@ionic/angular';

@Directive({
  selector: '[appAnimatedFab]'
})
export class AnimatedFabDirective {
  @Input('appAnimatedFab') fab: any;
  expanded = true;

  shrinkAnimation: Animation | undefined;

  constructor(private animationCtrl: AnimationController) { }

}
