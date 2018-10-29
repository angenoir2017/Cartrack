import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

/**
 * Generated class for the TaxiPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var google;

@IonicPage()
@Component({
  selector: 'page-taxi',
  templateUrl: 'taxi.html',
})
export class TaxiPage {
  public map;
  constructor(public navCtrl: NavController, public navParams: NavParams, private geolocation: Geolocation){
  }


  //@ Créons a present la carte google avec une longLat en parametre




  ionViewDidEnter() {


  }


}
