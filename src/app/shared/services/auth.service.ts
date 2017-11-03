import { Injectable } from '@angular/core';
import { LocalStorageService } from "ngx-webstorage";

@Injectable()
export class AuthService {
  constructor(private localStorage: LocalStorageService) {
  }

  getToken() {
    const token = this.localStorage.retrieve('token');
    return token ? token : false;
  }

  setToken(token: string) {
    this.localStorage.store('token', token);
  }

  clearToken() {
    this.localStorage.clear('token');
    this.clearUserInfo();
  }

  getUserInfo() {
    const user = this.localStorage.retrieve('user');
    return user ? user : false;
  }

  setUserInfo(user: any) {
    this.localStorage.store('user', user);
  }

  clearUserInfo() {
    this.localStorage.clear('user');
  }
}
