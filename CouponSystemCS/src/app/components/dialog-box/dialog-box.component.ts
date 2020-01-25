import {Component, Inject, Optional} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA, MatDialog} from '@angular/material';
import {Company} from '../../models/company';
import {CompaniesService} from '../../services/companies.service';
import {AdminCompanyComponent} from '../admin-company/admin-company.component';

export interface UsersData {
  name: string;
  id: number;
}


@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.css']
})
export class DialogBoxComponent {

  action: string;
  localData: any;
  public company: Company = new Company();

  constructor(
    public dialogRef: MatDialogRef<DialogBoxComponent>,
    private companiesService: CompaniesService,
    public dialog: MatDialog,
    // @Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: UsersData) {
    console.log(data);
    this.localData = {...data};
    this.company = new Company(this.localData.id,
      this.localData.name,
      this.localData.password,
      this.localData.email);
    this.action = this.localData.action;
  }

  // tslint:disable-next-line:use-lifecycle-interface
  ngOnInit(adminCompany: AdminCompanyComponent) {
  }

  doAction() {
    if (this.action === 'Add') {
      this.companiesService.addCompany(this.company).subscribe(c => {
        console.log(this.company);
      }, error1 => {
        error1(error1.message);
      });
    }
    this.dialogRef.close({event: this.action, data: this.localData});
  }

  closeDialog() {
    this.dialogRef.close({event: 'Cancel'});
  }

  public updateCompany(updateID): void {
    this.company.id = updateID;
    console.log(this.company);
    this.companiesService.updateCompany(this.company).subscribe(c => {
      console.log(this.company);
    }, error1 => {
      error1(error1.message);
    });
    this.dialogRef.close({event: this.action, data: this.localData});
  }

  public deleteCompany(updateID) {
    this.companiesService.deleteCompany(updateID).subscribe(data => {
    }, error1 => {
      error1(error1.message);
    });
    this.dialogRef.close({event: this.action, data: this.localData});
  }

}
