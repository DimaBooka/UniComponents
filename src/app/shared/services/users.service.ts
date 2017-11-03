import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Http } from '@angular/http';
import { LOGIN_ENDPOINT, USER_INFO } from '../constants';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import { Subject } from 'rxjs/Subject';
import { Router } from '@angular/router';

@Injectable()
export class UsersService {

  public isLogged = new Subject();

  constructor(
    private http: Http,
    private authService: AuthService,
    private router: Router
  ) { }

  login(loginData: any) {
    // return this.http.post(LOGIN_ENDPOINT, loginData)
    return this.http.get(LOGIN_ENDPOINT)
      .map(resp => {
        resp = resp.json();
        this.authService.setToken(resp['token']);
        this.getUserDetail().subscribe();
        return resp;
      });
  }

  logout() {
    this.authService.clearToken();
    this.isLogged.next(false);
    this.router.navigate(['login']);
  }

  checkUserAndToken() {
    const token = this.authService.getToken();
    if (token)
      this.getUserDetail().subscribe();
  }

  getUsersList() {

  }

  getUserDetail() {
    return this.http.get(USER_INFO)
      .map(resp => {
        resp = resp.json();
        this.authService.setUserInfo(resp);
        this.isLogged.next(true);
        return resp;
      });
  }

  updateUserDetail() {

  }

  deleteUser() {

  }
}
