import {Component, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {Coupon} from '../../models/coupon';
import {CouponsService} from '../../services/coupons.service';
import {MatTableDataSource} from '@angular/material';
import {CouponsType} from '../company-add-coupon/company-add-coupon.component';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
// @ts-ignore
import * as _moment from 'moment';
// @ts-ignore
import {default as _rollupMoment} from 'moment';

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
  selector: 'app-company-coupons',
  templateUrl: './company-coupons.component.html',
  styleUrls: ['./company-coupons.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ]
})
export class CompanyCouponsComponent implements OnInit {

  public coupons: Coupon[];
  public showCoupon = false;
  displayedColumns: string[] = ['title', 'endDate', 'type', 'price'];
  dataSource;
  expandedElement: Coupon | null;
  public coupon: Coupon = new Coupon();
  public couponId: string;
  public addCouponButtonValue = 'Update Coupon';
  public selectedValue: string;
  public applyFilterValue: string;
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

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit() {
    this.couponsService.getAllCouponsByCompany().subscribe(coupons => {
      this.coupons = coupons;
      this.dataSource = new MatTableDataSource(this.coupons);
      console.log('CompanyCouponsComponent array of coupons \n' + this.coupons);
    }, error1 => {
      error1(error1.message);
    });
  }

  public deleteCoupon(updateID) {
    this.coupon.id = updateID;
    console.log('Coupon ID is:' + updateID);
    if (window.confirm('Are you sure, you want delete?')) {
      this.couponsService.deleteCoupon(updateID).subscribe(data => {
        this.ngOnInit();
      });
    }
  }

  public refresh(): void {
    this.ngOnInit();
  }
}
