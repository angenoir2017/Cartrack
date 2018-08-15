import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the CartePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-carte',
  templateUrl: 'carte.html',
})
export class CartePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }



  ionViewDidEnter() {
    console.log('ionViewDidLoad CartePage');
  }


}
