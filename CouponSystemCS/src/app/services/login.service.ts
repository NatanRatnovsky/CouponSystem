import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Facade} from '../models/facade';
import {LoginModel} from '../models/loginModel';
import {AccountCred} from '../models/accountCred';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private token: any;
  private accauntCred: AccountCred;
  private uri = 'http://localhost:8080/login';

  constructor(private httpClient: HttpClient, private router: Router) {
  }

  public login(accountCred: AccountCred) {
    console.log('before: ' + accountCred.name, accountCred.password, accountCred.clientType);
    this.httpClient.post(this.uri + '?name=' + accountCred.name + '&password=' + accountCred.password, {
      accountCred
    }).subscribe((resp) => {
      accountCred = resp;
      console.log('RESPONSE: ' + accountCred);
      localStorage.clear();
      localStorage.setItem('tokenId', accountCred.id);
      localStorage.setItem('tokenName', accountCred.name);
      localStorage.setItem('tokenPassword', accountCred.password);
      localStorage.setItem('tokenClientType', accountCred.clientType);
      if (localStorage.getItem('tokenClientType') === 'ADMIN') {
        this.router.navigate(['/admin']);
      }
      if (localStorage.getItem('tokenClientType') === 'CUSTOMER') {
        this.router.navigate(['/client']);
      }
      if (localStorage.getItem('tokenClientType') === 'COMPANY') {
        this.router.navigate(['/company']);
      }
      if (localStorage.getItem('tokenClientType') === 'UNKNOWN') {
        window.alert('E-mail or password is invalid!');
      }
    }, err => {
      console.log(err);
    });
  }

  public logout() {
    localStorage.removeItem('token');
  }

  public get logIn(): boolean {
    // tslint:disable-next-line:no-non-null-assertion
    return (localStorage.getItem('token') ! == null);
  }
}
