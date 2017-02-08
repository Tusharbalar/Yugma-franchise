import { Component } from '@angular/core';
import { NavController, ActionSheetController, ModalController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { AllRequestPage } from '../all-request/request';
import { RequestService } from '../../service/request.service';
import { CustomService } from '../../service/customService';
import { newRequestModal } from '../all-request/new/newRequestModal';

@Component({
  selector: 'dashboard',
  templateUrl: 'dashboard.html'
})
export class Dashboard {

  constructor(public actionSheetCtrl: ActionSheetController,
              public modalCtrl: ModalController,
              public navCtrl: NavController) {
  }

  goToAllRequest() {
    this.navCtrl.setRoot(AllRequestPage);
  }

  logout() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Are you sure you want to logout ?',
      buttons: [
        {
          text: 'Submit',
          icon: 'ios-paper-outline',
          handler: () => {
            localStorage.clear();
            this.navCtrl.setRoot(LoginPage);
          }
        },{
          text: 'Cancel',
          icon: 'md-close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  newRequest(): void {
    let newRequest = this.modalCtrl.create(newRequestModal);
    newRequest.onDidDismiss((newRequest) => {
      if (!newRequest) {
        return;
      }
      this.navCtrl.setRoot(AllRequestPage);
    });
    newRequest.present();
  }

}
