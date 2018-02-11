import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastController, Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';

/*
  Generated class for the BackproProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class BackproProvider {

  constructor(public http: HttpClient, private toast: ToastController, private store: Storage,
    private platform: Platform) {
    this.platform.ready().then(() => {
      this.getKey('appStatus').then(data => {
        if(data == undefined || data == null) {
          this.setKey('appStatus',false);
        }
      })
    })
    console.log('Hello BackproProvider Provider');
  }
  jsonCall(jsonfile) {
    return this.http.get(jsonfile);
  }
  onToast(mess) {
    let toas = this.toast.create({
      message: mess,
      position: 'top',
      duration: 5000
    });
    toas.present();
  }
  setKey(keyname, value) {
    return this.store.set(keyname, value);
  }
  getKey(keyname) {
    return this.store.get(keyname);
  }
  delKey(keyname) {
    return this.store.remove(keyname);
  }
}
