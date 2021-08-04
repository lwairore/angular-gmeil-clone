import { Component, OnInit } from '@angular/core';
import sampleData from 'src/assets/data.json';

@Component({
  selector: 'app-mail',
  templateUrl: './mail.page.html',
  styleUrls: ['./mail.page.scss'],
})
export class MailPage implements OnInit {
  emails = sampleData;

  constructor() { }

  ngOnInit() {
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


}
