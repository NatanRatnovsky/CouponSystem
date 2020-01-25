import {Component, OnInit} from '@angular/core';
import {tokenName} from '@angular/compiler';

@Component({
  selector: 'app-head-login',
  templateUrl: './head-login.component.html',
  styleUrls: ['./head-login.component.css']
})
export class HeadLoginComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

  public clearLocalStorage(): void {
    localStorage.clear();
  }

}
