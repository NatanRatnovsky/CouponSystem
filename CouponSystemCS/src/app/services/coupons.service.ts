import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Coupon} from '../models/coupon';
import {Customer} from '../models/customer';
import {PurchaseCoupon} from '../models/purchaseCoupon';
import {AccountCred} from '../models/accountCred';

@Injectable({
  providedIn: 'root'
})
export class CouponsService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };
  public purchaseCoupon: PurchaseCoupon;

  constructor(private httpClient: HttpClient) {
  }

  public getAllCoupons(): Observable<Coupon[]> {
    console.log(this.httpClient.get<Coupon[]>('http://localhost:8080/customer/coupons'));
    return this.httpClient.get<Coupon[]>('http://localhost:8080/customer/coupons');
  }

  public getCouponById(id: string): Observable<Coupon> {
    console.log('send id to server is: ' + localStorage.getItem('tokenId'));
    return this.httpClient.get<Coupon>('http://localhost:8080/company/getCoupon/' + id);
  }

  public purchase(coupon: Coupon): Observable<Coupon> {
    console.log('Purchase service - coupon:' + coupon.title + '\nId:' + localStorage.getItem('tokenId'));
    return this.httpClient.post<Coupon>('http://localhost:8080/customer/purchase/' +
      localStorage.getItem('tokenId'), coupon);
  }

  public getPurchasedCoupon(): Observable<Coupon[]> {
    return this.httpClient.get<Coupon[]>('http://localhost:8080/customer/purchasedCoupons/' + localStorage.getItem('tokenId'));
  }

  public createCoupon(coupon: Coupon): Observable<Coupon> {
    return this.httpClient.post<Coupon>('http://localhost:8080/company/createCoupon/' + localStorage.getItem('tokenId'), coupon);
  }

  public getAllCouponsByCompany(): Observable<Coupon[]> {
    console.log('http://localhost:8080/company/getCoupons/' + localStorage.getItem('tokenId'));
    console.log('response in getAllCouponsByCompany() is:'
      + this.httpClient.get<Coupon[]>('http://localhost:8080/company/getCoupons/' + localStorage.getItem('tokenId')));
    return this.httpClient.get<Coupon[]>('http://localhost:8080/company/getCoupons/' + localStorage.getItem('tokenId'));
  }

  public deleteCoupon(couponId: string) {
    return this.httpClient.delete<Coupon>('http://localhost:8080/company/removeCoupon/' + couponId, this.httpOptions);
  }

  public updateCoupon(coupon: Coupon): Observable<Coupon> {
    console.log('coupon in service' + coupon.id);
    return this.httpClient.put<Coupon>('http://localhost:8080/company/updateCoupon/', coupon);
  }
}
