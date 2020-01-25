import {Component, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-coupon-logo',
  templateUrl: './coupon-logo.component.html',
  styleUrls: ['./coupon-logo.component.css']
})
export class CouponLogoComponent implements OnInit {
  @Input()
  public imageSource: string;
  constructor() { }

  ngOnInit() {
  }

}
