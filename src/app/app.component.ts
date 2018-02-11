import { Component } from '@angular/core';
import { Platform, App } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { BackproProvider } from '../providers/backpro/backpro';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = 'HomePage';

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
    private serv: BackproProvider, app: App) {
    platform.ready().then(() => {
      this.serv.getKey('appStatus').then(data => {
        if (!data) {
          for (let i = 2; i < 5; i++) {
            this.serv.setKey('lv' + i, true);
          }
        }
      })
      statusBar.hide();
      splashScreen.hide();

      //register back button action
      platform.registerBackButtonAction(() => {
        let nav = app.getActiveNavs()[0];
        let activeView = nav.getActive();
        if (activeView.name === "HomePage") {
          platform.exitApp();
        }
        if (activeView.name === "SelectlevelPage") {
          nav.push('HomePage');
        }
        if (activeView.name === "QuisPage") {
          nav.push('SelectlevelPage');
        }
      })
    });
  }
}

