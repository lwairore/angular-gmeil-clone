import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationController, GestureController, IonItem } from '@ionic/angular';

const ANIMATION_BREAKPOINT = 70;

@Component({
  selector: 'app-swipe-item',
  templateUrl: './swipe-item.component.html',
  styleUrls: ['./swipe-item.component.scss'],
})
export class SwipeItemComponent implements OnInit, AfterViewInit {
  @Input('email') m: any;
  @ViewChild(IonItem, { read: ElementRef })
  item: ElementRef | undefined;
  @ViewChild('wrapper')
  wrapper: ElementRef | undefined;
  @ViewChild('trash', { read: ElementRef })
  trashIcon: ElementRef | undefined;
  @ViewChild('archive', { read: ElementRef })
  archiveIcon: ElementRef | undefined;
  @Output() delete: EventEmitter<any> = new EventEmitter();

  bigIcon = false;

  trashAnimation: any;
  archiveAnimation: any;
  deleteAnimation: any;

  constructor(
    private router: Router,
    private gestureCtrl: GestureController,
    private animationCtrl: AnimationController
  ) { }

  ngAfterViewInit() {
    this.setupIconAnimations();
    if (!(this.item instanceof ElementRef)) { return; }
    const style = this.item.nativeElement.style;
    const windowWidth = window.innerWidth;

    this.deleteAnimation = this.animationCtrl.create('delete-animation')
      .addElement(this.item.nativeElement)
      .duration(300)
      .easing('ease-out')
      .fromTo('height', '89px', '0');

    const moveGesture = this.gestureCtrl.create({
      el: this.item.nativeElement,
      gestureName: 'move',
      threshold: 0,
      onStart: ev => {
        style.tansition = '';
      },
      onMove: ev => {
        if (!(this.item instanceof ElementRef) ||
          !(this.wrapper instanceof ElementRef)) { return; }
        style.transform = `translate3d(${ev.deltaX}px, 0, 0)`;
        this.item.nativeElement.classList.add('rounded');



        if (ev.deltaX > 0) {
          this.wrapper.nativeElement.style['background-color'] = 'var(--ion-color-primary)';
        } else if (ev.deltaX < 0) {
          this.wrapper.nativeElement.style['background-color'] = 'green';
        }

        if (ev.deltaX > ANIMATION_BREAKPOINT && !this.bigIcon) {
          this.animateTrash(true);
        } else if (ev.deltaX > 0 && ev.deltaX < ANIMATION_BREAKPOINT && this.bigIcon) {
          this.animateTrash(false);
        }

        if (ev.deltaX < -ANIMATION_BREAKPOINT && !this.bigIcon) {
          this.animateArchive(true);
        } else if (ev.deltaX < 0 && ev.deltaX > -ANIMATION_BREAKPOINT && this.bigIcon) {
          this.animateArchive(false);
        }
      },
      onEnd: ev => {
        this.item?.nativeElement.classList.remove('rounded');
        style.transition = '0.2s ease-out';
        if (ev.deltaX > ANIMATION_BREAKPOINT) {
          style.transform = `translate3d(${windowWidth}px, 0, 0)`;
          this.deleteAnimation.play();
          this.deleteAnimation.onFinish(() => {
            this.delete.emit(true);
          });
        } else if (ev.deltaX < -ANIMATION_BREAKPOINT) {
          style.transform = `translate3d(-${windowWidth}px, 0, 0)`;
          this.deleteAnimation.play();
          this.deleteAnimation.onFinish(() => {
            this.delete.emit(true);
          });
        } else {
          style.transform = '';
        }
      }
    });
    moveGesture.enable();
  }

  ngOnInit() { }

  setupIconAnimations() {
    if (this.trashIcon instanceof ElementRef) {
      this.trashAnimation = this.animationCtrl.create('trash-animation')
        .addElement(this.trashIcon.nativeElement)
        .duration(300)
        .easing('ease-in')
        .fromTo('transform', 'scale(1)', 'scale(1.5)');
    }

    if (this.archiveIcon instanceof ElementRef) {
      this.archiveAnimation = this.animationCtrl.create('archive-animation')
        .addElement(this.archiveIcon.nativeElement)
        .duration(300)
        .easing('ease-in')
        .fromTo('transform', 'scale(1)', 'scale(1.5)');
    }
  }


  animateTrash(zoomIn: any) { }

  animateArchive(zoomIn: any) { }

  openDetails(id: any) { }

}


/**
 * We define an ANIMATION_BREAKPOINT which is the distance after which an item can be released and will be delete. Until that value, the item will only snap back to it’s original place
 * We need a gesture and handle the move and end of our item
 * On move, we check the direction and color the background of our wrapper red or green depending on the x direction
 * On move, we transform the X coordinates according to the current delta to move the item left or right
 * On move, we animate the trash/archive icon if we crossed the breakpoint and run a function to handle this
 * On end, we check if we are above our breakpoint and slide the item out to the left/right and run a custom delete animation that we define upfront. This function animates the height, so the item flys out and the row collapses at the same time
 * On end, when the animation has finished we emit this to the parent component using an EventEmitter
 */