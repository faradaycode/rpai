import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the ModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html',
})
export class ModalPage {
  stateModal: boolean;
  lastVerdict: boolean;
  scoreV: number;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public viewCtrl: ViewController) {
    let param = this.navParams.get('message');
    if (param == 'benar') {
      this.stateModal = true;
      setTimeout(() => {
        this.closeModal();
      }, 1000);
    }

    if (param == 'salah') {
      this.stateModal = false;
    }

    if (param != 'benar' && param != 'salah') {
      this.lastVerdict = true;
      setTimeout(() => {
        this.closeLevel();
      }, 1000);
    }
  }

  public closeModal() {
    this.viewCtrl.dismiss();
  }
  public closeLevel() {
    this.viewCtrl.dismiss();
    this.navCtrl.push('SelectlevelPage');
  }
}
