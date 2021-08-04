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

}
