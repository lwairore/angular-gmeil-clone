import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import sampleData from 'src/assets/data.json';
import { AccountPage } from '../account/account.page';

@Component({
  selector: 'app-mail',
  templateUrl: './mail.page.html',
  styleUrls: ['./mail.page.scss'],
})
export class MailPage implements OnInit {
  emails: any[] = sampleData;

  constructor(private popoverCtrl: PopoverController) { }

  ngOnInit() {
    for (let e of this.emails) {
      // Create a custom color for every email
      e.color = this.intToRGB(this.hashCode(e.from));
    }
  }

  // https://stackoverflow.com/questions/3426404/create-a-hexadecimal-colour-based-on-a-string-with-javascript
  private hashCode(str: string) {
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return hash;
  }

  private intToRGB(i: any) {
    var c = (i & 0x00FFFFFF)
      .toString(16)
      .toUpperCase();

    return '#' + '00000'.substring(0, 6 - c.length) + c;
  }

  doRefresh(ev: any) {
    setTimeout(() => {
      ev.target.complete();
    }, 2000);
  }

  async openAccount(ev: any) {
    const popover = await this.popoverCtrl.create({
      component: AccountPage,
      event: ev,
      cssClass: 'custom-popover'
    });

    await popover.present();
  }

}
