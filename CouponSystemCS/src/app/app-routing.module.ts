import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './components/home/home.component';
import {LoginComponent} from './layouts/login/login.component';
import {AdminComponent} from './components/admin/admin.component';
import {ClientComponent} from './components/client/client.component';
import {CompanyComponent} from './components/company/company.component';

const routes: Routes = [
  {path: 'home' , component: HomeComponent},
  {path: 'login' , component: LoginComponent},
  {path: 'dmn' , component: AdminComponent},
  {path: 'client', component: ClientComponent},
  {path: 'company', component: CompanyComponent},
  {path: ' ' , component: HomeComponent},
  {path: '**' , component: HomeComponent},
];
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, {onSameUrlNavigation:
    'reload'})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
