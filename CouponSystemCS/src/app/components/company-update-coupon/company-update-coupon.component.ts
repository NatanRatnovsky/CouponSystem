import {Component, OnInit} from '@angular/core';
import {Coupon} from '../../models/coupon';
import {CouponsService} from '../../services/coupons.service';
import {FormControl} from '@angular/forms';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
// @ts-ignore
import * as _moment from 'moment';
// @ts-ignore
import {default as _rollupMoment} from 'moment';
import {MatTableDataSource} from '@angular/material';

const moment = _rollupMoment || _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'YYYY-MM-DD',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

export interface CouponsType {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-company-update-coupon',
  templateUrl: './company-update-coupon.component.html',
  styleUrls: ['./company-update-coupon.component.css'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ]
})
export class CompanyUpdateCouponComponent implements OnInit {

  public coupons: Coupon[];
  dataSource;
  public coupon: Coupon = new Coupon();
  date = new FormControl(moment());
  public selectedValue: string;
  couponTypes: CouponsType[] = [
    {value: 'Restaurants', viewValue: 'Restaurants'},
    {value: 'Electricity', viewValue: 'Electricity'},
    {value: 'Food', viewValue: 'Food'},
    {value: 'Health', viewValue: 'Health'},
    {value: 'Sports', viewValue: 'Sports'},
    {value: 'Camping', viewValue: 'Camping'},
    {value: 'Traveling', viewValue: 'Traveling'}
  ];

  constructor(private couponsService: CouponsService) {
  }

  ngOnInit() {
    this.couponsService.getAllCouponsByCompany().subscribe(coupons => {
      this.coupons = coupons;
      this.dataSource = new MatTableDataSource(this.coupons);
      console.log(this.coupons);
    }, error1 => {
      error1(error1.message);
    });
  }

  public updateCoupon(updateCouponID): void {
    if (updateCouponID != null) {
      this.coupon.id = updateCouponID;
      this.coupon.type = this.selectedValue;
      this.coupon.companyId = Number(localStorage.getItem('tokenId'));
      console.log('Update coupon ID is:' + updateCouponID);
      console.log('Update coupon Type is:' + this.coupon.type);
    }

    this.couponsService.updateCoupon(this.coupon).subscribe(c => {
      this.ngOnInit();
    }, error1 => {
      error1(error1.message);
    });
  }

  public refresh(): void {
    this.ngOnInit();
  }

}
