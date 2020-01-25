import {Component, Input, OnInit} from '@angular/core';
import {Coupon} from '../../models/coupon';
import {CouponsService} from '../../services/coupons.service';
import {AccountCred} from '../../models/accountCred';
import {Customer} from '../../models/customer';

@Component({
  selector: 'app-coupon-in-table',
  templateUrl: './coupon-in-table.component.html',
  styleUrls: ['./coupon-in-table.component.css']
})
export class CouponInTableComponent implements OnInit {

  public coupon: Coupon;
  public accountCred: AccountCred;
  public customer: Customer;
  @Input()
  public id: string;
  constructor(private couponService: CouponsService) { }

  ngOnInit() {
    console.log(this.coupon);
    console.log('coupon-in table id: ' + this.id);
    this.couponService.getCouponById(this.id).subscribe(coupon => {
      this.coupon = coupon;
    });
  }

  public purchase() {
    this.couponService.purchase(this.coupon).subscribe(c => {
      window.alert('Coupon purchased!');
    }, error1 => {
      error1(error1.message);
    });
  }
}
