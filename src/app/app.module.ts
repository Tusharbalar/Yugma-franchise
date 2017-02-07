import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Dashboard } from '../pages/dashboard/dashboard';
import { AllRequestPage } from '../pages/all-request/request';
import { LoginPage } from '../pages/login/login';

import { AuthService } from '../service/auth.service';
import { RequestService } from '../service/request.service';
import { Configuration } from '../service/app.constants';

import { ListView } from '../customComponent/list/listview.component';
import { CustomNavbar } from '../customComponent/navbar.component.ts';

import { ViewComponent } from '../pages/all-request/view/viewRequestModal';
import { newRequestModal } from '../pages/all-request/new/newRequestModal';
import { CustomService } from '../service/customService';
import { MomentModule } from 'angular2-moment/moment.module';
import { ListViewCloseButton,
         ListViewReopenButton,
         ListViewSatisfiedButton,
         ListViewCommentButton } from '../customComponent/list/edit-cs-status-and-comment.component';
import { CommentModal } from '../customComponent/commentModal.ts';
import { ModalNavbarComponent } from '../customComponent/modal.navbar.component';
import { ParentInfo } from '../service/parentInfo';

import { NetworkService } from '../service/app.networkDiagnosis';
import { ForgotPasswordModal } from '../pages/login/forgotPassword';

@NgModule({
  declarations: [
    MyApp,
    Dashboard,
    AllRequestPage,
    LoginPage,
    ListView,
    CustomNavbar,
    ListViewCloseButton,
    ListViewCommentButton,
    ListViewReopenButton,
    ListViewSatisfiedButton,
    CommentModal,
    ModalNavbarComponent,
    newRequestModal,
    ViewComponent,
    ForgotPasswordModal
  ],
  imports: [
    MomentModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Dashboard,
    AllRequestPage,
    LoginPage,
    ListView,
    CustomNavbar,
    ListViewCloseButton,
    ListViewCommentButton,
    ListViewReopenButton,
    ListViewSatisfiedButton,
    CommentModal,
    ModalNavbarComponent,
    newRequestModal,
    ViewComponent,
    ForgotPasswordModal
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, AuthService, Configuration, RequestService, CustomService, ParentInfo, NetworkService]
})
export class AppModule {}
