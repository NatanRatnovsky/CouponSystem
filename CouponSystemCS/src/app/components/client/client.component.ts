import {Component, OnInit} from '@angular/core';
import {MatDialog, MatTableDataSource} from '@angular/material';
import {Coupon} from '../../models/coupon';
import {CouponsService} from '../../services/coupons.service';
import {DialogBoxCouponComponent} from '../dialog-box-coupon/dialog-box-coupon.component';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  public coupon: Coupon = new Coupon();
  public coupons: Coupon[];
  public purchasedCoupons: Coupon[];
  public dataSource;
  public p: number;
  public pb: number;

  constructor(private couponsService: CouponsService, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.couponsService.getPurchasedCoupon().subscribe(coupons => {
      this.purchasedCoupons = coupons;
      this.dataSource = new MatTableDataSource(this.coupons);
    }, error1 => {
      error1(error1.message);
    });

    this.couponsService.getNotPurchasedCoupons().subscribe(coupons => {
      this.coupons = coupons;
      console.log('not purchased coupons have' + coupons.length + 'coupons');
    }, error1 => {
      error1(error1.message);
    });
  }

  public openCoupon(action, obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogBoxCouponComponent, {
      width: '750px',
      data: obj,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.event === 'Buy') {
        this.ngOnInit();
      } else if (result.event === 'Update') {
        this.ngOnInit();
      } else if (result.event === 'Delete') {
        this.ngOnInit();
      }
    });
  }

}
