import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import sampleData from 'src/assets/data.json';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  mailDetails: any;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    const emailID = this.activatedRoute.snapshot.paramMap.get('id');
    this.mailDetails = sampleData.find(detail => detail.id === emailID);
  }

  // https://stackoverflow.com/questions/3426404/create-a-hexadecimal-colour-based-on-a-string-with-javascript
  private hashCode(str: string) {
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return hash;
  }

}
