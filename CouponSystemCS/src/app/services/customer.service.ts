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
    return this.httpClient.get<Customer[]>('http://localhost:8080/admin/allCustomers');
  }

  public addCustomer(customer: Customer): Observable<Customer> {
    return this.httpClient.post<Customer>('http://localhost:8080/admin/addCustomer', customer);
  }

  public updateCustomer(customer: Customer): Observable<Customer> {
    return this.httpClient.put<Customer>('http://localhost:8080/admin/updateCustomer/', customer);
  }

  public deleteCustomer(id: number) {
    return this.httpClient.delete<Customer>('http://localhost:8080/admin/deleteCustomer/' + id,
      this.httpOptions);
  }
}
