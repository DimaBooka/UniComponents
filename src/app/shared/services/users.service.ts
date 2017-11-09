import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Http } from '@angular/http';
import { LOGIN_ENDPOINT, USER_INFO, USERS } from '../constants';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ShowErrorHandler } from '../handlers/error.handler';
import { ToasterService } from "angular2-toaster/src/toaster.service";

@Injectable()
export class UsersService {

  public isLogged = new BehaviorSubject(false);

  constructor(
    private http: Http,
    private authService: AuthService,
    private router: Router,
    private toasterService: ToasterService
  ) { }

  login(loginData: any) {
    return this.http.post(LOGIN_ENDPOINT, loginData)
    // return this.http.get(LOGIN_ENDPOINT)
      .map(resp => {
        resp = resp.json();
        this.authService.setToken(resp['X-SESSION-TOKEN']);

        this.authService.setUserInfo({ 'email': loginData['email']});
        this.isLogged.next(true);
        // if will be needed to fetch user info
        // this.getUserDetail().subscribe();

        return resp;
      })
      .catch(ShowErrorHandler(this.toasterService));
  }

  logout() {
    this.authService.clearToken();
    this.isLogged.next(false);
    this.router.navigate(['login']);
  }

  checkUserAndToken() {
    // if will be needed to fetch user info at the refresh page
    const token = this.authService.getToken();
    if (token) {
      this.isLogged.next(true);
    }
    // if (token)
    //   this.getUserDetail().subscribe();
  }

  getUsersList() {
    return this.http.get(USERS)
      .map(resp => {
        const respData: any[] = resp.json();
        const users: any[] = [];

        if (respData.length > 0) {
          respData.forEach(user => {
            users.push(user);
          });
        }

        return users;
      });
  }

  getUserDetail(id: string) {
    return this.http.get(`${USERS}/${id}`)
      .map(resp => {
        resp = resp.json();
        this.authService.setUserInfo(resp);
        this.isLogged.next(true);
        return resp;
      })
      .catch(ShowErrorHandler(this.toasterService));
  }

  createUser(user: any) {
    return this.http.post(USERS, user)
      .map(resp => {
        const respData: any = resp.json();
        // TODO: add user model and create instance here
        return respData;
      })
      .catch(ShowErrorHandler(this.toasterService));
  }

  updateUserDetail(user: any) {
    return this.http.post(`${USERS}/${user.id}`, user)
      .map(resp => {
        const respData: any = resp.json();
        // TODO: add user model and create instance here
        return respData;
      })
      .catch(ShowErrorHandler(this.toasterService));
  }

  deleteUser(user: any) {
    return this.http.delete(`${USERS}/${user.id}`)
      .map(resp => resp.json())
      .catch(ShowErrorHandler(this.toasterService));
  }
}
