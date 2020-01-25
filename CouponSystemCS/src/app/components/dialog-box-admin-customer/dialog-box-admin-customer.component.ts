import {Component, Inject, Optional} from '@angular/core';
import {Customer} from '../../models/customer';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {DialogBoxComponent} from '../dialog-box/dialog-box.component';
import {AdminCustomerComponent} from '../admin-customer/admin-customer.component';
import {CustomerService} from '../../services/customer.service';

export interface UsersData {
  name: string;
  id: number;
}

@Component({
  selector: 'app-dialog-box-admin-customer',
  templateUrl: './dialog-box-admin-customer.component.html',
  styleUrls: ['./dialog-box-admin-customer.component.css']
})
export class DialogBoxAdminCustomerComponent {

  action: string;
  localData: any;
  public customer: Customer = new Customer();

  constructor(
    public dialogRef: MatDialogRef<DialogBoxComponent>,
    private customerService: CustomerService,
    public dialog: MatDialog,
    // @Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: UsersData
  ) {
    this.localData = {...data};
    this.customer = new Customer(this.localData.id,
      this.localData.name,
      this.localData.password,
      this.localData.email);
    this.action = this.localData.action;
  }

  // tslint:disable-next-line:use-lifecycle-interface
  ngOnInit(adminCustomer: AdminCustomerComponent) {
  }

  public addCustomer() {
    this.customerService.addCustomer(this.customer).subscribe(c => {
      console.log(this.customer);
    }, error1 => {
      error1(error1.message);
    });
    this.dialogRef.close({event: this.action, data: this.localData});
  }

  public closeDialog() {
    this.dialogRef.close({event: 'Cancel'});
  }

  public updateCustomer(updateID): void {
    this.customer.id = updateID;
    this.customerService.updateCustomer(this.customer).subscribe(c => {
      console.log(this.customer);
    }, error1 => {
      error1(error1.message);
    });
    this.dialogRef.close({event: this.action, data: this.localData});
  }

  public deleteCustomer(updateID) {
    this.customerService.deleteCustomer(updateID).subscribe(data => {
    }, error1 => {
      error1(error1.massage);
    });
    this.dialogRef.close({event: this.action, data: this.localData});
  }

}
