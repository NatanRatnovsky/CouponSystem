import {Component, OnInit} from '@angular/core';
import {Coupon} from '../../models/coupon';
import {CouponsService} from '../../services/coupons.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-coupon',
  templateUrl: './coupon.component.html',
  styleUrls: ['./coupon.component.css']
})
export class CouponComponent implements OnInit {

  public coupons: Coupon[];
  public firstCoupon: Coupon;
  public couponById: Coupon;
  time = new Date();

  constructor(private couponService: CouponsService, private router: Router) {
  }

  ngOnInit() {
    // this.couponService.getAllCoupons().subscribe(couponsArray => {
    //   this.coupons = couponsArray;
    //   this.firstCoupon = couponsArray[0];
    //   console.log(this.firstCoupon);
    // }, error1 => {
    //   alert(error1.message);
    // });
    // setInterval(() => {
    //   this.time = new Date();
    // }, 1000);
  }

  public purchase() {
    this.router.navigate(['/login']);
  }
}
