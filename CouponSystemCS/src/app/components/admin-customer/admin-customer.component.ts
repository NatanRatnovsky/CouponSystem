import {Component, OnInit} from '@angular/core';
import {Customer} from '../../models/customer';
import {MatTableDataSource} from '@angular/material';
import {CustomerService} from '../../services/customer.service';
import {animate, state, style, transition, trigger} from '@angular/animations';

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
  displayedColumns: string[] = ['id', 'name', 'password', 'email'];
  dataSource;
  expandedElement: Customer | null;
  public customer: Customer = new Customer();
  public addCustomerButtonValue = 'Add Customer';

  constructor(private customerService: CustomerService) {
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public toggleCustomer(): void {
    if (!this.showCustomer) {
      this.showCustomer = true;
      this.addCustomerButtonValue = 'Close';
    } else {
      this.showCustomer = false;
      this.addCustomerButtonValue = 'Add Customer';
    }

  }

  ngOnInit() {
    this.customerService.getAllCustomers().subscribe(customers => {
      this.customers = customers;
      this.dataSource = new MatTableDataSource(this.customers);
    }, error => {
      alert(error);
    });

  }

  public addCustomerFunc(): void {
    this.customerService.addCustomer(this.customer).subscribe(c => {
      console.log(this.customer);
      this.ngOnInit();
      this.toggleCustomer();
    }, error => {
      error(error.message);
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

}
