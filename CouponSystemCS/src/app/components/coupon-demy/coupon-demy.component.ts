import {Component, Input, OnInit} from '@angular/core';
import {Coupon} from '../../models/coupon';
import {CouponsService} from '../../services/coupons.service';

@Component({
  selector: 'app-coupon-demy',
  templateUrl: './coupon-demy.component.html',
  styleUrls: ['./coupon-demy.component.css']
})
export class CouponDemyComponent implements OnInit {

  public coupon: Coupon;
  @Input()
  public id: string;
  constructor(private couponService: CouponsService) { }

  ngOnInit() {
    console.log('coupon-in table id: ' + this.id);
    this.couponService.getCouponById(this.id).subscribe(coupon => {
      this.coupon = coupon;
    });
  }

  public deleteCoupon() {
    if (window.confirm('Are you sure, you want delete?')) {
      this.couponService.deleteCoupon(this.id).subscribe(data => {
        this.ngOnInit();
      });
    }
  }

}
