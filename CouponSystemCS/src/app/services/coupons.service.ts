import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Coupon} from '../models/coupon';
import {PurchaseCoupon} from '../models/purchaseCoupon';

@Injectable({
  providedIn: 'root'
})
export class CouponsService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  constructor(private httpClient: HttpClient) {
  }

  public getAllCoupons(): Observable<Coupon[]> {
    console.log(this.httpClient.get<Coupon[]>('hcustomer/coupons'));
    return this.httpClient.get<Coupon[]>('customer/coupons');
  }

  public getCouponById(id: string): Observable<Coupon> {
    console.log('send id to server is: ' + localStorage.getItem('tokenId'));
    return this.httpClient.get<Coupon>('company/getCoupon/' + id);
  }

  public purchase(coupon: Coupon): Observable<Coupon> {
    return this.httpClient.post<Coupon>('customer/purchase/' +
      localStorage.getItem('tokenId'), coupon);
  }

  public getPurchasedCoupon(): Observable<Coupon[]> {
    return this.httpClient.get<Coupon[]>('customer/purchasedCoupons/' + localStorage.getItem('tokenId'));
  }

  public getNotPurchasedCoupons(): Observable<Coupon[]> {
    return this.httpClient.get<Coupon[]>('customer/notPurchased/' + localStorage.getItem('tokenId'));
  }

  public createCoupon(coupon: Coupon): Observable<Coupon> {
    return this.httpClient.post<Coupon>('company/createCoupon/' + localStorage.getItem('tokenId'), coupon);
  }

  public getAllCouponsByCompany(): Observable<Coupon[]> {
    console.log('company/getCoupons/' + localStorage.getItem('tokenId'));
    console.log('response in getAllCouponsByCompany() is:'
      + this.httpClient.get<Coupon[]>('company/getCoupons/' + localStorage.getItem('tokenId')));
    return this.httpClient.get<Coupon[]>('company/getCoupons/' + localStorage.getItem('tokenId'));
  }

  public deleteCoupon(couponId: string) {
    return this.httpClient.delete<Coupon>('company/removeCoupon/' + couponId, this.httpOptions);
  }

  public updateCoupon(coupon: Coupon): Observable<Coupon> {
    console.log('coupon in service' + coupon.id);
    return this.httpClient.put<Coupon>('company/updateCoupon/', coupon);
  }
}
