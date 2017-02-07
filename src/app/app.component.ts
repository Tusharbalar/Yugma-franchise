import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, Events, AlertController } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { TabsPage } from '../pages/tabs/tabs';
import { AllRequestPage } from '../pages/all-request/request';

import { Configuration } from '../service/app.constants';

// import component
import { LoginPage } from '../pages/login/login';

import { AuthService } from '../service/auth.service';
import { NetworkService } from '../service/app.networkDiagnosis';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) nav: Nav;
  rootPage;

  constructor(platform: Platform,
              public events: Events,
              private _configuration: Configuration,
              public alertCtrl: AlertController,
              public networkService: NetworkService,
              public authService: AuthService) {
    platform.ready().then(() => {
      this.listenToLoginEvents();
      this.networkService.checkNetworkStatus();
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
    this.hasLoggedIn();
  }

  hasLoggedIn() {
    if (this.authService.isLoggedIn()) {
      // this.rootPage = AllRequestPage;
    } else {
      this.rootPage = LoginPage;
    }
  }

  listenToLoginEvents() {
    this.events.subscribe('user:login', () => {
      console.log("Login successfully");
      this._configuration.setAccessToken();
      this.nav.setRoot(AllRequestPage);
    });
    this.events.subscribe('user:logout', () => {
      this.authService.resetLoginStatus();
    });
    this.events.subscribe("session:expired", (data) => {
      this.presentConfirm();
    });
  }

  presentConfirm() {
    let alert = this.alertCtrl.create({
      title: 'Session Expired',
      message: "You're already logged in some other device. You may again login.",
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Logout',
          handler: () => {
            this.onSubmit();
          }
        }
      ]
    });
    alert.present();
  }

  onSubmit() {
    localStorage.clear();
    this.rootPage = LoginPage;
    this.events.publish('user:logout');
  }

}
