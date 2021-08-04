import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit, Renderer2 } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  public appPages = [
    { title: 'Inbox', url: '/folder/Inbox', icon: 'mail' },
    { title: 'Outbox', url: '/folder/Outbox', icon: 'paper-plane' },
    { title: 'Favorites', url: '/folder/Favorites', icon: 'heart' },
    { title: 'Archived', url: '/folder/Archived', icon: 'archive' },
    { title: 'Trash', url: '/folder/Trash', icon: 'trash' },
    { title: 'Spam', url: '/folder/Spam', icon: 'warning' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  private onlineEventUnlistener: (() => void) | undefined;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer2: Renderer2) { }

  ngOnInit() {

  }

  ngOnDestroy() {
    if (this.onlineEventUnlistener) {
      this.onlineEventUnlistener();
    }
  }

  displayNetworkStatus() {
    if (navigator.onLine) {
      this.renderer2.setStyle(
        this.document.body, 'filter', '');
    } else {
      this.renderer2.setStyle(
        this.document.body, 'filter', 'grayscale(1)');
    }
  }


}
