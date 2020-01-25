import {Component, OnInit} from '@angular/core';
import {Input, Output, EventEmitter} from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';
import {LoginService} from '../../services/login.service';
import {AccountCred} from '../../models/accountCred';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public typeOfClient: string;

  constructor(private loginService: LoginService) {
  }

  public name: string;
  public password: string;

  ngOnInit(): void {
    this.typeOfClient = localStorage.getItem('tokenClientType');
  }
  public Login() {
    // this.loginService.login(new AccountCred (this.name, this.password, null));
    // this.ngOnInit();
  }


}
