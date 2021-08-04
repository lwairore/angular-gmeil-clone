import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { IonItem } from '@ionic/angular';

@Component({
  selector: 'app-swipe-item',
  templateUrl: './swipe-item.component.html',
  styleUrls: ['./swipe-item.component.scss'],
})
export class SwipeItemComponent implements OnInit {
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

  constructor() { }

  ngOnInit() { }

}
