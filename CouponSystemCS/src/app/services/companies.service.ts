import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Company} from '../models/company';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})


export class CompaniesService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      // 'Authorization': 'my-auth-token'
    })
  };

  constructor(private httpClient: HttpClient) {
  }

  public getAllCompanies(): Observable<Company[]> {
    if (localStorage.getItem('tokenClientType') === 'ADMIN') {
      return this.httpClient.get<Company[]>('admin/companies');
    } else {
      return null;
    }
  }

  public addCompany(comp: Company): Observable<Company> {
    return this.httpClient.post<Company>('admin/addCompany', comp);
  }

  public updateCompany(comp: Company): Observable<Company> {
    return this.httpClient.put<Company>('admin/updateCompany/', comp);
  }

  public deleteCompany(id: number) {
    return this.httpClient.delete<Company>('admin/deleteCompany/' + id,
      this.httpOptions);
  }
}

