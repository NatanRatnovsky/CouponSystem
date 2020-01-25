import {Component, OnInit} from '@angular/core';
import {LoginService} from '../../services/login.service';
import {AccountCred} from '../../models/accountCred';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-head-login',
  templateUrl: './head-login.component.html',
  styleUrls: ['./head-login.component.css']
})
export class HeadLoginComponent implements OnInit {

  public loginName: string;

  public name: string;
  public password: string;
  public typeOfClient: string;

  constructor(private loginService: LoginService,
              private authService: AuthService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.loginName = localStorage.getItem('tokenName');
  }

  onLogout() {
    this.authService.logout();
    this.ngOnInit();
    this.router.navigate(['/home']);
  }

  public login() {
    this.loginService.login(new AccountCred(this.name, this.password, null), () => {
      this.loginName = localStorage.getItem('tokenName');
    });


  }

}

