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
  createMap(){
    // Obtenir la position du telephone
    this.geolocation.getCurrentPosition().then(location => {

      //On le converti en un objet de longitude et de latitude de google map
      //lui meme si non la carte ne fonctionnera pas avec les longLat de geolocation
      let latLng = new google.maps.LatLng(location.coords.latitude, location.coords.longitude);

      //Definissons les options primaires de la Map(Carte de Cartrack)
      let mapOptions ={
        center:latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        disableDefaultUI:true
      }

      //Ici on obtient l'element du HTML qui doit afficher la carte
      let mapEl = document.getElementById('map');
      let map = new google.maps.Map(mapEl, mapOptions);

      return map;
    });


  }

  ionViewDidEnter() {
    this.map = this.createMap();

  }


}
