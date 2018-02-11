import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BackproProvider } from '../../providers/backpro/backpro';

/**
 * Generated class for the SelectlevelPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-selectlevel',
  templateUrl: 'selectlevel.html',
})
export class SelectlevelPage {
  lock2: boolean;
  lock3: boolean;
  lock4: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, private serv: BackproProvider) {
  }
  ngOnInit() {
    this.serv.getKey('lv2').then(data => {
      this.lock2 = data;
    });
    this.serv.getKey('lv3').then(data => {
      this.lock3 = data;
    })
    this.serv.getKey('lv4').then(data => {
      this.lock4 = data;
    })
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad SelectlevelPage');
  }
  goto(page, param) {
    this.navCtrl.push(page, { lv: param });
  }

}
