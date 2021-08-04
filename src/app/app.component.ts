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
  private offlineEventUnlistener: (() => void) | undefined;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer2: Renderer2) { }

  ngOnInit() {
    this.onlineEventUnlistener = this.renderer2.listen('window', 'online', () => this.displayNetworkStatus());
    this.offlineEventUnlistener = this.renderer2.listen('window', 'offline', () => this.displayNetworkStatus());
  }

  ngOnDestroy() {
    if (this.onlineEventUnlistener) {
      this.onlineEventUnlistener();
    }

    if (this.offlineEventUnlistener) {
      this.offlineEventUnlistener();
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
