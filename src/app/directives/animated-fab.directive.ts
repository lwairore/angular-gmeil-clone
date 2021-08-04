import { AfterViewInit, Directive, Input } from '@angular/core';
import { AnimationController } from '@ionic/angular';

@Directive({
  selector: '[appAnimatedFab]'
})
export class AnimatedFabDirective implements AfterViewInit {
  @Input('appAnimatedFab') fab: any;
  expanded = true;

  shrinkAnimation: any;

  constructor(private animationCtrl: AnimationController) { }

  ngAfterViewInit() {
    this.fab = this.fab.el;
    this.setupAnimation();
  }

  setupAnimation() {
    const textSpan = this.fab.querySelector('span');

    const shrink = this.animationCtrl.create('shrink')
      .addElement(this.fab)
      .duration(400)
      .fromTo('width', '140px', '50px');

    const fade = this.animationCtrl.create('fade')
      .addElement(textSpan)
      .duration(400)
      .fromTo('opacity', 1, 0)
      .fromTo('width', '70px', '0px');

    this.shrinkAnimation = this.animationCtrl.create('shrink-animation')
      .duration(400)
      .easing('ease-out')
      .addAnimation([shrink, fade]);
  }
}
