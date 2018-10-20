import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ParametrePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-parametre',
  templateUrl: 'parametre.html',
})
export class ParametrePage {
  menus =[
    {title:'profils', icon: 'person', component: 'ParametrePage'}
  ];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ParametrePage');
  }
  onPage(theComponent){
    this.navCtrl.push(theComponent);
  }
}
