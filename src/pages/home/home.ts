import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { BackproProvider } from '../../providers/backpro/backpro';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private serv: BackproProvider) {

  }
  goTo(id) {
    this.navCtrl.push(id);
    this.serv.getKey('appStatus').then(data => {
      if(data) {
        this.serv.setKey('appStatus',true);
      }
    })
  }
}
