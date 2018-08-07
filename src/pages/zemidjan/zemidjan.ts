import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Platform } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';


/**
 * Generated class for the ZemidjanPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-zemidjan',
  templateUrl: 'zemidjan.html',
})
export class ZemidjanPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,private geo: Geolocation,private platform: Platform) {
    platform.ready().then(() => {
      this.geo.getCurrentPosition().then(resp => {
        console.log(resp.coords.latitude);
        console.log(resp.coords.longitude);
      }).catch((error) => {
        console.log('Error getting location', error);
      });
      

    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ZemidjanPage');
  }

}
