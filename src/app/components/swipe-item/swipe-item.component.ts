import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-swipe-item',
  templateUrl: './swipe-item.component.html',
  styleUrls: ['./swipe-item.component.scss'],
})
export class SwipeItemComponent implements OnInit {
  @Input('email') m: any;

  constructor() { }

  ngOnInit() {}

}
