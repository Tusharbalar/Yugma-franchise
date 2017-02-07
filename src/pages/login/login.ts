import { Component } from '@angular/core';

import { LoadingController, NavController, ToastController, AlertController, MenuController, ModalController } from 'ionic-angular';

import { Configuration } from '../../service/app.constants';
import { AuthService } from '../../service/auth.service';
import { Push } from 'ionic-native';
import { AllRequestPage } from '../all-request/request';
import { ForgotPasswordModal } from './forgotPassword';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})

export class LoginPage {

  user: any;

  loading;
  username;
  password;

  relationship1;

  constructor(public navCtrl: NavController,
              public authService: AuthService,
              public loadingCtrl: LoadingController,
              public modalCtrl: ModalController,
              public configuration: Configuration,
              public menuCtrl: MenuController,
              public toastCtrl: ToastController,
              private alertCtrl: AlertController) { this.menuCtrl.enable(false); }

  login() {
    if (this.username === undefined || this.password === undefined) { return false; }
    let data = {
      username: this.username,
      password: this.password
    }
    this.presentLoadingDefault('Authenticating...');
    this.authService.verifyUser(data).subscribe(response => {
      this.authService.info().subscribe((res) => {
        this.loading.dismiss();
        this.successToast();
        this.setNotificationToken();
      }, (err) => {
        console.log("err", err);
      })
    }, (err) => {
      this.loading.dismiss();
      if (err.status === 400) {
        this.errorToast('Invalid username or password');
      } else {
        this.errorToast('Internal server error.. Try again later');
      }
    });
  }

  presentLoadingDefault(msg) {
    this.loading = this.loadingCtrl.create({
      content: msg
    });
    this.loading.present();
  }

  errorToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }

  successToast() {
    let toast = this.toastCtrl.create({
      message: 'Account setup successfully...',
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }

  setNotificationToken() {
    let push = Push.init({
      android: {
        senderID: "562555006958"
      },
      ios: {
        alert: "true",
        badge: "true",
        sound: "true"
      },
      windows: {}
    });

    push.on('registration', (data) => {
      let tokenId = data.registrationId;
      this.configuration.tokenUpdate(tokenId).subscribe((res) => {
      }, (err) => {
        this.errorToast("Failed to update notification setting... try again later");
      });
    });

    push.on('notification', (data) => {
      let self = this;
      if (data.additionalData.foreground) {
        let confirmAlert = this.alertCtrl.create({
          title: 'New Notification',
          message: data.message,
          buttons: [{
            text: 'Ignore',
            role: 'cancel'
          }, {
            text: 'View',
            handler: () => {
              self.navCtrl.setRoot(AllRequestPage);
            }
          }]
        });
        confirmAlert.present();
      } else {
        self.navCtrl.setRoot(AllRequestPage);
      }
    });

    push.on('error', (e) => {
      console.log("error---------------------------------------");
    });
  }

  openModal() {
    let viewComplaint = this.modalCtrl.create(ForgotPasswordModal);
    viewComplaint.present();
  }

}
