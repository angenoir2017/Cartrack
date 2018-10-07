import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


/**
 * Generated class for the ZemidjanPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var google;

@IonicPage()
@Component({
  selector: 'page-zemidjan',
  templateUrl: 'zemidjan.html',
})
export class ZemidjanPage {
  public map;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }


  ionViewDidLoad() {

  }

}
