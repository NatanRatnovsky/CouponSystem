import {Component, OnInit} from '@angular/core';
import {Company} from '../../models/company';
import {CompaniesService} from '../../services/companies.service';
import {MatTableDataSource} from '@angular/material/table';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-admin-company',
  templateUrl: './admin-company.component.html',
  styleUrls: ['./admin-company.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class AdminCompanyComponent implements OnInit {

  public companies: Company[];
  public showCompany = false;
  displayedColumns: string[] = ['id', 'name', 'password', 'email'];
  dataSource;
  expandedElement: Company | null;
  public company: Company = new Company();
  public addCompanyButtonValue = 'Add Company';

  constructor(private companiesService: CompaniesService) {
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public toggleCompany(): void {
    if (!this.showCompany) {
      this.showCompany = true;
      this.addCompanyButtonValue = 'Close';
    } else {
      this.showCompany = false;
      this.addCompanyButtonValue = 'Add Company';
    }

  }

  ngOnInit() {
    this.companiesService.getAllCompanies().subscribe(companies => {
        console.log(companies);
        this.companies = companies;
        this.dataSource = new MatTableDataSource(this.companies);
      }, error1 => {
        alert(error1);
      }
    );
  }

  public addCompanyFunc(): void {
    this.companiesService.addCompany(this.company).subscribe(c => {
      console.log(this.company);
      this.ngOnInit();
      this.toggleCompany();
    }, error1 => {
      error1(error1.message);
    });
  }

  public updateCompany(updateID): void {
    this.company.id = updateID;
    console.log(this.company);
    this.companiesService.updateCompany(this.company).subscribe(c => {
      console.log(this.company);
      this.ngOnInit();
    }, error1 => {
      error1(error1.message);
    });
  }

  public deleteCompany(updateID) {
    if (window.confirm('Are you sure, you want to delete?')) {
      this.companiesService.deleteCompany(updateID).subscribe(data => {
        this.ngOnInit();
      });

    }
  }
}
