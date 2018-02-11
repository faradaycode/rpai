import { BackproProvider } from './../../providers/backpro/backpro';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController, FabContainer } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';
import { FormBuilder, FormGroup } from '@angular/forms';

/**
 * Generated class for the QuisPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-quis',
  templateUrl: 'quis.html',
})
export class QuisPage {
  datas: any = [];
  trueAns: number = 0;
  val: number;
  lv: any; //get param level
  Qcounter: number; //count how many question

  isFifty: boolean = true;
  isWa: boolean = true;
  isRight: boolean = true;

  rbCheck: any = {};

  trueA: boolean = false;
  trueB: boolean = false;
  trueC: boolean = false;
  trueD: boolean = false;

  radioForm: FormGroup;
  choices = ['a', 'b', 'c', 'd'];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private serv: BackproProvider, private alertCtrl: AlertController,
    public modalCtrl: ModalController, private sosmed: SocialSharing,
    private form: FormBuilder) {
    this.val = 0;
    this.lv = this.navParams.get('lv');
  }

  ionViewDidLoad() {
  }

  ngOnInit() {
    this.radioForm = this.form.group({
      listRadio: ['']
    })
    this.showQuestion();
  }

  showQuestion() {
    this.Qcounter++;
    let diff = [];
    this.serv.jsonCall('assets/rpai.json').subscribe(data => {
      for (let i = 0; i < Object.keys(data).length; i++) {
        if (this.lv == data[i].level) {
          diff.push(data[i]);
          this.Qcounter = diff.length;
        }
      }
      if (this.val < diff.length) {
        this.datas = diff[this.val];
      }
    });
  }
  chkAnswer(val) {
    if (this.rbCheck == val) {
      this.presentConfirm(true);
    } else {
      this.presentConfirm(false);
    }
    console.log(this.Qcounter + " " + this.trueAns)
  }
  public openModal(mess) {
    var data = { message: mess };
    var modalPage = this.modalCtrl.create('ModalPage', data);
    modalPage.present();
  }
  presentConfirm(state) {
    let alert = this.alertCtrl.create({
      title: 'Konfirmasi',
      message: 'Yakin Dengan Jawaban Anda?',
      buttons: [
        {
          text: 'Tidak',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Iya',
          handler: () => {
            if (state) {
              this.val += 1;
              this.trueAns++;
              this.resetDiv();

              // if you answer all question then next level unlocked
              if (this.trueAns == this.Qcounter) {
                this.Ender();
              } else {
                this.openModal('benar');
              }
              this.showQuestion();
            } else {
              this.val = 0;
              this.trueAns = 0;
              this.resetDiv();
              this.resetHelp();
              this.openModal('salah');
              this.showQuestion();
            }
          }
        }
      ]
    });
    alert.present();
  }

  // 50:50 like who wants to be millionaire ##regards https://github.com/thinkingjoey
  //a little modified by me
  fifty(fab: FabContainer) {
    let divided = []; //to collect true and one wrong answer
    let benar = this.datas.trueans; //get value of true answer
    let idxbenar = this.choices.indexOf(benar); //get index of trueans in array
    divided.push(this.choices[idxbenar]); //push trueans into this array
    this.choices.splice(idxbenar, 1); //throw away trueans, leaving only wrong answer
    let randWrong = Math.floor(Math.random() * this.choices.length); //randomize wrong answer
    divided.push(this.choices[randWrong]); //push the selected wrong answer inside

    for (let j = 0; j < this.choices.length; j++) {
      let hiden = document.getElementById(this.choices[j]);
      hiden.className += " " + 'invisible';
    }
    for (let k = 0; k < divided.length; k++) {
      let appear = document.getElementById(divided[k]);
      appear.className = appear.className.replace(/\binvisible\b/g, '');
    }
    this.isFifty = false;
    fab.close();
  }

  //show true answer, looser
  showTrue(fab: FabContainer) {
    let benar = this.datas.trueans;

    if (benar == 'a') {
      this.trueA = true;
    }
    if (benar == 'b') {
      this.trueB = true;
    }
    if (benar == 'c') {
      this.trueC = true;
    }
    if (benar == 'd') {
      this.trueD = true;
    }

    this.isRight = false;
    fab.close();
  }
  askWA(question,fab: FabContainer) {
    this.sosmed.canShareVia('whatsapp').then(() => {
      this.sosmed.shareViaWhatsApp("Nanya dong:\n" + question + "?", null, null);
    }).catch(err => this.serv.onToast(JSON.stringify(err)));
    fab.close();
  }
  resetDiv() {
    for (let i = 0; i < this.choices.length; i++) {
      let ids = document.getElementById(this.choices[i]);
      ids.className = ids.className.replace(/\binvisible\b/g, "");
    }

    this.radioForm.controls.listRadio.reset(); //clear checked ion-radio 

    this.trueA = false;
    this.trueB = false;
    this.trueC = false;
    this.trueD = false;
  }
  resetHelp() {
    if (!this.isFifty) {
      this.isFifty = true;
    }
    if (!this.isRight) {
      this.isRight = true;
    }
    if (!this.isWa) {
      this.isWa = true;
    }
  }

  Ender() {
    let levelup = this.lv + 1;
    this.serv.delKey('lv' + levelup)
    this.openModal(this.lv);
  }
}