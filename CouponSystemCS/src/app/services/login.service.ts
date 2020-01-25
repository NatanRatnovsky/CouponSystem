import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {AccountCred} from '../models/accountCred';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private accauntCred: AccountCred;
  private uri = 'login';

  constructor(private httpClient: HttpClient, private router: Router) {
  }

  public async login(accountCred: AccountCred, cb: any) {
    await this.httpClient.post(this.uri + '?name=' + accountCred.name + '&password=' + accountCred.password, {
      accountCred
    }).subscribe((resp) => {
      console.log('in service -> ' + JSON.stringify(resp));
      accountCred = this.accauntCred = resp;
      localStorage.setItem('tokenId', accountCred.id);
      localStorage.setItem('tokenName', accountCred.name);
      localStorage.setItem('tokenPassword', accountCred.password);
      localStorage.setItem('tokenClientType', accountCred.clientType);
      localStorage.setItem('tokenEmail', accountCred.email);
      if (localStorage.getItem('tokenClientType') === 'ADMIN') {
        localStorage.setItem('tokenName', 'Admin');
        this.router.navigate(['/dmn'], { skipLocationChange: true });
      }
      if (localStorage.getItem('tokenClientType') === 'CUSTOMER') {
        this.router.navigate(['/client'], { skipLocationChange: true });
      }
      if (localStorage.getItem('tokenClientType') === 'COMPANY') {
        this.router.navigate(['/company'], { skipLocationChange: true });
      }
      if (localStorage.getItem('tokenClientType') === 'UNKNOWN') {
        window.alert('E-mail or password is invalid!');
      }
      cb();
    }, err => {
      console.log(err);
    });

  }

  public getAccountCred() {
    return this.accauntCred;
  }

}
