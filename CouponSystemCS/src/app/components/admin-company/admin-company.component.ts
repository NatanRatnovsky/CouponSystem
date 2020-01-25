import {Component, OnInit, ViewChild} from '@angular/core';
import {Company} from '../../models/company';
import {CompaniesService} from '../../services/companies.service';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MatDialog} from '@angular/material';
import {DialogBoxComponent} from '../dialog-box/dialog-box.component';

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
  displayedColumns: string[] = ['id', 'name', 'password', 'email', 'action'];
  dataSource;
  public company: Company = new Company();
  public addCompanyButtonValue = 'Add Company';

  @ViewChild(MatTable, {static: true}) table: MatTable<any>;

  constructor(private companiesService: CompaniesService, private dialog: MatDialog) {
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
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

  public openDialog(action, obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '450px',
      data: obj,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.event === 'Add') {
        this.ngOnInit();
      } else if (result.event === 'Update') {
        this.ngOnInit();
      } else if (result.event === 'Delete') {
        this.ngOnInit();
      }
    });
  }

//   public addRowData(rowObj) {
//     const d = new Date();
//     this.dataSource.push({
//       id: d.getTime(),
//       name: rowObj.name
//     });
//     this.table.renderRows();
//
//   }
//
//   updateRowData(rowObj) {
//     this.dataSource = this.dataSource.filter((value, key) => {
//       if (value.id === rowObj.id) {
//         value.name = rowObj.name;
//       }
//       return true;
//     });
//   }
//
//   deleteRowData(rowObj) {
//     this.dataSource = this.dataSource.filter((value, key) => {
//       return value.id !== rowObj.id;
//     });
//   }
}
