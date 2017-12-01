import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Http } from '@angular/http';
import { LOGIN_ENDPOINT, USER_INFO, USERS, PERMISSION } from '../constants';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ShowErrorHandler } from '../handlers/error.handler';
import { ToasterService } from "angular2-toaster/src/toaster.service";
import { User } from '../models/user.model';
import { Observable } from 'rxjs/Observable';
import { Subject } from "rxjs";

@Injectable()
export class UsersService {

  public isLogged = new BehaviorSubject(false);
  public permission = new BehaviorSubject(null);

  constructor(
    private http: Http,
    private authService: AuthService,
    private router: Router,
    private toasterService: ToasterService
  ) { }

  login(loginData: any) {
    return this.http.post(LOGIN_ENDPOINT, loginData)
      .map(resp => {
        resp = resp.json();
        this.authService.setToken(resp['X-SESSION-TOKEN']);

        this.authService.setUserInfo({ 'email': loginData['email']});
        this.getPermissions().subscribe(resp => {
          this.isLogged.next(true)
        });

        return resp;
      })
      .catch(ShowErrorHandler(this.toasterService, this));
  }

  logout() {
    this.isLogged.next(false);
    this.authService.clearToken();
    this.permission.next(null);
    this.router.navigate(['login']);
  }

  checkUserAndToken() {
    const token = this.authService.getToken();
    if (token) {
      this.getPermissions().subscribe(reps => {
        this.isLogged.next(true);
      });
    }
  }

  getPermissions() {
    return this.http.get(PERMISSION)
      .map(resp => {
        const response = resp.json()['permission'];
        this.permission.next(response);
        return response;
      })
      .catch(ShowErrorHandler(this.toasterService, this));
  }

  getUsersList() {
    return this.http.get(USERS)
      .map(resp => {
        const respData: any = resp.json();
        const users: any[] = [];
        if (respData && respData['users'].length > 0) {
          respData['users'].forEach(user => {
            users.push(User.createFromJSON(user));
          });
        }

        return users;
      })
      .catch(ShowErrorHandler(this.toasterService, this));
  }

  getUserDetail(id: string) {
    return this.http.get(`${USERS}/${id}`)
      .map(resp => {
        const respData: any = resp.json();
        const users: any[] = [];
        if (respData && respData['users'].length > 0) {
          respData['users'].forEach(user => {
            users.push(User.createFromJSON(user));
          });
        }

        return users;
      })
      .catch(ShowErrorHandler(this.toasterService, this));
  }

  createUser(user: any) {
    return this.http.post(USERS, user)
      .map(resp => {
        const respData: any = resp.json();
        // TODO: add user model and create instance here
        return respData;
      })
      .catch(ShowErrorHandler(this.toasterService, this));
  }

  updateUserDetail(user: any) {
    return this.http.put(`${USERS}/${user.id}`, user)
      .map(resp => {
        const respData: any = resp.json();
        // TODO: add user model and create instance here
        return respData;
      })
      .catch(ShowErrorHandler(this.toasterService, this));
  }

  deleteUser(user: any) {
    return this.http.delete(`${USERS}/${user.id}`)
      .map(resp => resp.json())
      .catch(ShowErrorHandler(this.toasterService, this));
  }
}
