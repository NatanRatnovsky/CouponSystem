import { Component, OnInit } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {Coupon} from '../../models/coupon';
import {CouponsService} from '../../services/coupons.service';
import {MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-customer-coupon',
  templateUrl: './customer-coupon.component.html',
  styleUrls: ['./customer-coupon.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class CustomerCouponComponent implements OnInit {
  public coupons: Coupon[];
  public showCoupon = false;
  displayedColumns: string[] = ['title', 'endDate', 'type', 'price'];
  dataSource;
  expandedElement: Coupon | null;
  public coupon: Coupon = new Coupon();
  public couponId: string;

  constructor(private couponsService: CouponsService) { }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit() {
    this.couponsService.getPurchasedCoupon().subscribe(coupons => {
      this.coupons = coupons;
      this.dataSource = new MatTableDataSource(this.coupons);
      console.log(this.coupon);
    }, error1 => {
      error1(error1.message);
    });
  }

  public refresh(): void {
    this.ngOnInit();
  }

}
