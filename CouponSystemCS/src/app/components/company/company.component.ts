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
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MatDialog, MatTableDataSource} from '@angular/material';
import {DialogBoxCompanyCouponComponent} from '../dialog-box-company-coupon/dialog-box-company-coupon.component';
import {DialogBoxCouponComponent} from '../dialog-box-coupon/dialog-box-coupon.component';

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
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class CompanyComponent implements OnInit {

  public coupon: Coupon = new Coupon();
  public coupons: Coupon[];
  displayedColumns: string[] = ['title', 'endDate', 'type', 'price', 'action'];
  dataSource;
  expandedElement: Coupon | null;
  public couponId: string;
  public addCouponButtonValue = 'Update Coupon';
  public selectedValue: string;
  public applyFilterValue: string;
  date = new FormControl(moment());
  // public selectedValue: string;
  couponTypes: CouponsType[] = [
    {value: 'Restaurants', viewValue: 'Restaurants'},
    {value: 'Electricity', viewValue: 'Electricity'},
    {value: 'Food', viewValue: 'Food'},
    {value: 'Health', viewValue: 'Health'},
    {value: 'Sports', viewValue: 'Sports'},
    {value: 'Camping', viewValue: 'Camping'},
    {value: 'Traveling', viewValue: 'Traveling'}
  ];

  constructor(private couponService: CouponsService , private dialog: MatDialog) {
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit() {
    this.couponService.getAllCouponsByCompany().subscribe(coupons => {
      this.coupons = coupons;
      this.dataSource = new MatTableDataSource(this.coupons);
    }, error1 => {
      error1(error1.message);
    });
  }

  public openDialog(action, obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogBoxCompanyCouponComponent, {
      width: '450px',
      data: obj
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.event === 'Add') {
        console.log('on close Add');
        this.ngOnInit();
      } else if (result.event === 'Update') {
        this.ngOnInit();
      } else if (result.event === 'Delete') {
        this.ngOnInit();
      }
    });
  }

  public openCoupon(action, obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogBoxCouponComponent, {
      width: '750px',
      data: obj,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.event === 'Add') {
        console.log('on close Add');
        this.ngOnInit();
      } else if (result.event === 'Update') {
        this.ngOnInit();
      } else if (result.event === 'Delete') {
        this.ngOnInit();
      }
    });
  }

  public addCouponFunc(): void {
    this.coupon.type = this.selectedValue;
    this.coupon.companyId = Number(localStorage.getItem('tokenId'));
    this.couponService.createCoupon(this.coupon).subscribe(c => {
      console.log(this.coupon);
    }, error1 => {
      error1(error1.message);
    });
  }

}
