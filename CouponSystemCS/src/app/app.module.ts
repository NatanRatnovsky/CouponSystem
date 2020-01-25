import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatButtonModule, MatDatepickerModule,
  MatDividerModule,
  MatFormFieldModule, MatGridListModule,
  MatIconModule,
  MatInputModule, MatProgressSpinnerModule, MatSelectModule,
  MatTableModule, MatTabsModule,
  MatToolbarModule
} from '@angular/material';
import { LayoutComponent } from './components/layout/layout.component';
import { HomeComponent } from './components/home/home.component';
import {RouterModule} from '@angular/router';
import { CouponComponent } from './components/coupon/coupon.component';
import {MatCardModule} from '@angular/material';
import { FooterComponent } from './layouts/footer/footer.component';
import { HeaderComponent } from './layouts/header/header.component';
import {AppRoutingModule} from './app-routing.module';
import { LoginComponent } from './layouts/login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { LogoComponent } from './layouts/logo/logo.component';
import { HeadLoginComponent } from './layouts/head-login/head-login.component';
import { AdminComponent } from './components/admin/admin.component';
import { ClientComponent } from './components/client/client.component';
import { HttpClientModule} from '@angular/common/http';
import { AdminCompanyComponent } from './components/admin-company/admin-company.component';
import { AdminCustomerComponent } from './components/admin-customer/admin-customer.component';
import { CouponLogoComponent } from './components/coupon-logo/coupon-logo.component';
import { CompanyComponent } from './components/company/company.component';
import { CouponsForSaleComponent } from './components/coupons-for-sale/coupons-for-sale.component';
import { CouponInTableComponent } from './components/coupon-in-table/coupon-in-table.component';
import { CustomerCouponComponent } from './components/customer-coupon/customer-coupon.component';
import { CompanyCouponsComponent } from './components/company-coupons/company-coupons.component';
import { CompanyAddCouponComponent } from './components/company-add-coupon/company-add-coupon.component';
import { CompanyUpdateCouponComponent } from './components/company-update-coupon/company-update-coupon.component';
import { CouponDemyComponent } from './components/coupon-demy/coupon-demy.component';
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MatMomentDateModule} from '@angular/material-moment-adapter';


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
    CouponsForSaleComponent,
    CouponInTableComponent,
    CustomerCouponComponent,
    CompanyCouponsComponent,
    CompanyAddCouponComponent,
    CompanyUpdateCouponComponent,
    CouponDemyComponent,
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
    MatMomentDateModule
  ],
  providers: [
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } }
  ],
  bootstrap: [LayoutComponent]
})
export class AppModule { }
