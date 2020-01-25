import {Component, Inject, OnInit, Optional} from '@angular/core';
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
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatTableDataSource} from '@angular/material';


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
  selector: 'app-dialog-box-coupon',
  templateUrl: './dialog-box-coupon.component.html',
  styleUrls: ['./dialog-box-coupon.component.css'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})

export class DialogBoxCouponComponent implements OnInit {
  public imageSearce: string;
  action: string;
  localData: any;
  public coupon: Coupon = new Coupon();
  date = new FormControl(moment());
  couponTypes: CouponsType[] = [
    {value: 'Restaurants', viewValue: 'Restaurants'},
    {value: 'Electricity', viewValue: 'Electricity'},
    {value: 'Food', viewValue: 'Food'},
    {value: 'Health', viewValue: 'Health'},
    {value: 'Sports', viewValue: 'Sports'},
    {value: 'Camping', viewValue: 'Camping'},
    {value: 'Traveling', viewValue: 'Traveling'}
  ];

  constructor(private couponsService: CouponsService,
              public dialogRef: MatDialogRef<DialogBoxCouponComponent>,
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
      this.localData.companyId,
    );
    this.action = this.localData.action;
    console.log(this.coupon);
  }


ngOnInit() {
}

  closeDialog() {
    this.dialogRef.close({event: 'Cancel'});
  }

  public purchase(coupon) {
    this.couponsService.purchase(coupon).subscribe(c => {
      this.ngOnInit();
    }, error1 => {
      error1(error1.message);
    });
    this.dialogRef.close({event: 'Buy'});
  }
}


