import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Customer} from '../models/customer';


@Injectable({
  providedIn: 'root'
})

export class CustomerService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      // 'Authorization': 'my-auth-token'
    })
  };
  constructor( private httpClient: HttpClient) { }

  public getAllCustomers(): Observable<Customer[]> {
    return this.httpClient.get<Customer[]>('admin/allCustomers');
  }

  public addCustomer(customer: Customer): Observable<Customer> {
    return this.httpClient.post<Customer>('admin/addCustomer', customer);
  }

  public updateCustomer(customer: Customer): Observable<Customer> {
    return this.httpClient.put<Customer>('admin/updateCustomer/', customer);
  }

  public deleteCustomer(id: number) {
    return this.httpClient.delete<Customer>('admin/deleteCustomer/' + id,
      this.httpOptions);
  }
}
