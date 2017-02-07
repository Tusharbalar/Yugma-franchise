import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { TabsPage } from '../pages/tabs/tabs';
import { AllRequestPage } from '../pages/all-request/request';

// import component
import { LoginPage } from '../pages/login/login';

import { AuthService } from '../service/auth.service';
import { NetworkService } from '../service/app.networkDiagnosis';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage;

  constructor(platform: Platform,
              public networkService: NetworkService,
              public authService: AuthService) {
    platform.ready().then(() => {
      this.networkService.checkNetworkStatus();
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
    this.hasLoggedIn();
  }

  hasLoggedIn() {
    if (this.authService.isLoggedIn()) {
      this.rootPage = AllRequestPage;
    } else {
      this.rootPage = LoginPage;
    }
  }
}
