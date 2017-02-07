import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { ToastController, Events } from 'ionic-angular';

import { RequestService } from './request.service';

import { Observable } from 'rxjs/Observable';
import { Configuration } from './app.constants';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class AuthService {

  private serverUrl: string;
  private access_token: string;
  public header;
  options;

  constructor(private _http : Http,
              private toastCtrl: ToastController,
              public events: Events,
              public c: RequestService,
              private _configuration: Configuration) {
    this.serverUrl = _configuration.Server;
  }

  public hasLogin: boolean = false;

  resetLoginStatus() {
    this.hasLogin = false;
  }

  isLoggedIn() {
    this.access_token = localStorage.getItem("access_token");
    if (this.access_token) {
      this.checkUserSession();
      return !this.hasLogin;
    } else {
      return this.hasLogin;
    }
  }

  checkUserSession() {
    this.info().subscribe((res) => {
    }, (err) => {
      if (err.status === 401) {
       this.events.publish("session:expired");
      }
    });
  }

  verifyUser(data: Object): Observable<any[]> {
    return this._http.post(this.serverUrl + "/login", data).map((res: Response) => {
      this.access_token = res.json().access_token;
      localStorage.setItem("access_token", this.access_token);
      console.log("access_token", this.access_token)
      return this.access_token;
    }).catch((error: any) => Observable.throw(error || 'server error'));
  }

  headers;

  info() {

    this.headers = new Headers({
      'Content-Type' : 'application/json',
      'Authorization' : 'Bearer ' + this.access_token
    });

    var options = new RequestOptions({
      headers : this.headers
    });

    return this._http.get(this.serverUrl + "/franchise/info", options).map((res: Response) => {
      this.storeData(res.json());
      return res.json();
    }).catch((error: any) => Observable.throw(error || 'server error'));

  }

  getCategories() {
    let id = localStorage.getItem("id");
    this.options = this._configuration.setAccessToken();
    this._http.get("https://yugmatesting01.appspot.com/franchise/" + id +"/request/category", this.options).map((res: Response) => {
      localStorage.setItem("categories", JSON.stringify(res.json()));
    }).catch((error: any) => Observable.throw(error || 'server error'));
  }

  public storeData(data) {
    localStorage.setItem("access_token", this.access_token);
    localStorage.setItem("id", data.id);
    localStorage.setItem("username", data.username);
    localStorage.setItem("contactNo", data.contactNo);
    localStorage.setItem("email", data.email);
    localStorage.setItem("name", data.name);
    localStorage.setItem("nickName", data.nickName);
    this.events.publish("user:login");
  }

  forgotPassword(username: string) {
    let data = {
      username: username
    }
    return this._http.put(this.serverUrl + "/forgot-password", data).map((res: Response) => {
      return res;
    }).catch((error: any) => Observable.throw(error || 'server error'));
  }

}
