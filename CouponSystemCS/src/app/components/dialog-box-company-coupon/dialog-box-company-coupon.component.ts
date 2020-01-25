import {Component, Inject, Optional} from '@angular/core';
// @ts-ignore
import {default as _rollupMoment} from 'moment';
import * as _moment from 'moment';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {Coupon} from '../../models/coupon';
import {FormControl} from '@angular/forms';
import {CouponsService} from '../../services/coupons.service';


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

export interface UsersData {
  name: string;
  id: number;
}

export interface CouponsType {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-dialog-box-company-coupon',
  templateUrl: './dialog-box-company-coupon.component.html',
  styleUrls: ['./dialog-box-company-coupon.component.css'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ]
})
export class DialogBoxCompanyCouponComponent {

  action: string;
  localData: any;
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

  constructor(private couponService: CouponsService,
              public dialogRef: MatDialogRef<DialogBoxCompanyCouponComponent>,
              public dialog: MatDialog,
              // @Optional() is used to prevent error if no data is passed
              @Optional() @Inject(MAT_DIALOG_DATA) public data: UsersData) {
    console.log(data);
    this.localData = {...data};
    this.coupon = new Coupon(this.localData.id,
      this.localData.title,
      this.localData.startDate,
      this.localData.endDate,
      this.localData.amount,
      this.localData.type,
      this.localData.message,
      this.localData.price,
      this.localData.image,
    );
    this.action = this.localData.action;
    console.log(this.coupon);
  }

  OnInit() {
  }

  public addCouponFunc(): void {
    this.coupon.type = this.selectedValue;
    this.coupon.companyId = Number(localStorage.getItem('tokenId'));
    this.couponService.createCoupon(this.coupon).subscribe(c => {
      console.log(this.coupon, 'action' + this.action);
    }, error1 => {
      error1(error1.message);
    });
    this.dialogRef.close({event: this.action, data: this.localData});
  }

  closeDialog() {
    this.dialogRef.close({event: 'Cancel'});
  }

  public deleteCoupon(updateID) {
    this.coupon.id = updateID;
    console.log('Coupon ID is:' + updateID);
    this.couponService.deleteCoupon(updateID).subscribe(data => {
    });
    this.dialogRef.close({event: this.action, data: this.localData});
  }

  public updateCoupon(updateCouponID): void {
    if (updateCouponID != null) {
      this.coupon.type = this.selectedValue;
      this.coupon.companyId = Number(localStorage.getItem('tokenId'));
      console.log('Coupon to update:' + this.coupon);
      console.log('Update coupon ID is:' + updateCouponID);
      console.log('Update coupon Type is:' + this.coupon.type);
    }
    this.couponService.updateCoupon(this.coupon).subscribe(c => {
    }, error1 => {
      error1(error1.message);
    });
    this.dialogRef.close({event: this.action, data: this.localData});
  }
}
