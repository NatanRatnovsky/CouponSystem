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
    return this.httpClient.get<Company[]>('http://localhost:8080/admin/companies');
  }

  public addCompany(comp: Company): Observable<Company> {
    return this.httpClient.post<Company>('http://localhost:8080/admin/addCompany', comp);
  }

  public updateCompany(comp: Company): Observable<Company> {
    return this.httpClient.put<Company>('http://localhost:8080/admin/updateCompany/', comp);
  }

  public deleteCompany(id: number) {
    return this.httpClient.delete<Company>('http://localhost:8080/admin/deleteCompany/' + id,
      this.httpOptions);
  }
}


