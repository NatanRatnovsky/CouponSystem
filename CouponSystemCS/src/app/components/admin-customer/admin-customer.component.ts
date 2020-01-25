import {Component, OnInit, ViewChild} from '@angular/core';
import {Customer} from '../../models/customer';
import {MatDialog, MatTable, MatTableDataSource} from '@angular/material';
import {CustomerService} from '../../services/customer.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {DialogBoxAdminCustomerComponent} from '../dialog-box-admin-customer/dialog-box-admin-customer.component';

@Component({
  selector: 'app-admin-customer',
  templateUrl: './admin-customer.component.html',
  styleUrls: ['./admin-customer.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class AdminCustomerComponent implements OnInit {

  public customers: Customer[];
  public showCustomer = false;
  displayedColumns: string[] = ['id', 'name', 'password', 'email', 'action'];
  dataSource;
  public customer: Customer = new Customer();
  public addCustomerButtonValue = 'Add Customer';

  @ViewChild(MatTable, {static: true}) table: MatTable<any>;

  constructor(private customerService: CustomerService, private dialog: MatDialog) {
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit() {
    this.customerService.getAllCustomers().subscribe(customers => {
      this.customers = customers;
      this.dataSource = new MatTableDataSource(this.customers);
    }, error => {
      alert(error);
    });

  }

  public updateCustomer(updateID): void {
    this.customer.id = updateID;
    console.log(this.customer);
    this.customerService.updateCustomer(this.customer).subscribe(c => {
      console.log(this.customer);
      this.ngOnInit();
    }, error1 => {
      error1(error1.message);
    });
  }

  public deleteCustomer(updateID) {
    if (window.confirm('Are you sure, you want to delete?')) {
      this.customerService.deleteCustomer(updateID).subscribe(data => {
        this.ngOnInit();
      });

    }
  }
  public openDialog(action, obj) {
    console.log(obj);
    obj.action = action;
    const dialogRef = this.dialog.open(DialogBoxAdminCustomerComponent, {
      width: '450px',
      data: obj
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

}
