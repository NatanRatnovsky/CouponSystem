import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatCardModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatMenuModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule
} from '@angular/material';
import {LayoutComponent} from './components/layout/layout.component';
import {HomeComponent} from './components/home/home.component';
import {RouterModule} from '@angular/router';
import {CouponComponent} from './components/coupon/coupon.component';
import {FooterComponent} from './layouts/footer/footer.component';
import {HeaderComponent} from './layouts/header/header.component';
import {AppRoutingModule} from './app-routing.module';
import {LoginComponent} from './layouts/login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LogoComponent} from './layouts/logo/logo.component';
import {HeadLoginComponent} from './layouts/head-login/head-login.component';
import {AdminComponent} from './components/admin/admin.component';
import {ClientComponent} from './components/client/client.component';
import {HttpClientModule} from '@angular/common/http';
import {AdminCompanyComponent} from './components/admin-company/admin-company.component';
import {AdminCustomerComponent} from './components/admin-customer/admin-customer.component';
import {CouponLogoComponent} from './components/coupon-logo/coupon-logo.component';
import {CompanyComponent} from './components/company/company.component';
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MatMomentDateModule} from '@angular/material-moment-adapter';
import {DialogBoxComponent} from './components/dialog-box/dialog-box.component';
import {AuthService} from './services/auth.service';
import {DialogBoxAdminCustomerComponent} from './components/dialog-box-admin-customer/dialog-box-admin-customer.component';
import {DialogBoxCompanyCouponComponent} from './components/dialog-box-company-coupon/dialog-box-company-coupon.component';
import {DialogBoxCouponComponent} from './components/dialog-box-coupon/dialog-box-coupon.component';
import {NgxPaginationModule} from 'ngx-pagination';


@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    HomeComponent,
    CouponComponent,
    FooterComponent,
    HeaderComponent,
    LoginComponent,
    LogoComponent,
    HeadLoginComponent,
    AdminComponent,
    ClientComponent,
    AdminCompanyComponent,
    AdminCustomerComponent,
    CouponLogoComponent,
    CompanyComponent,
    DialogBoxComponent,
    DialogBoxAdminCustomerComponent,
    DialogBoxCompanyCouponComponent,
    DialogBoxCouponComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    RouterModule,
    MatCardModule,
    MatTableModule,
    AppRoutingModule,
    MatToolbarModule,
    MatDividerModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatTabsModule,
    MatGridListModule,
    HttpClientModule,
    FormsModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatSelectModule,
    MatMomentDateModule,
    MatMenuModule,
    MatDialogModule,
    NgxPaginationModule,
  ],
  entryComponents: [
    DialogBoxComponent,
    DialogBoxAdminCustomerComponent,
    DialogBoxCompanyCouponComponent,
    DialogBoxCouponComponent
  ],
  providers: [
    {provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: {useUtc: true}},
    AuthService,
  ],
  bootstrap: [LayoutComponent]
})
export class AppModule {
}
