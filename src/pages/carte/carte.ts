import { Component,  NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
declare var google;
import {googlemaps} from 'googlemaps';

/**
 * Ici sera chargé le composant de google map avec ses differents parametres
 * la directive map sera donc appelle partout la necessité se fera sentir
 */

@IonicPage()
@Component({
  selector: 'page-carte',
  templateUrl: 'carte.html'
})
export class CartePage  {
  autocompleteItems: any;
  autocomplete: any;
  GoogleAutocomplete:any;
  placesService: any;


  public map;

  constructor(public navCtrl: NavController,public navParams: NavParams, public zone: NgZone, private geolocation: Geolocation) {
    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
    this.autocomplete = { input: '' };
    this.autocompleteItems = [];
  }

  updateSearchResults(){
    if (this.autocomplete.input == '') {
      this.autocompleteItems = [];
      return;
    }
    this.GoogleAutocomplete.getPlacePredictions({ input: this.autocomplete.input },
      (predictions, status) => {
        this.autocompleteItems = [];
        this.zone.run(() => {
          predictions.forEach((prediction) => {
            this.autocompleteItems.push(prediction);
          });
        });
      });
  }

  //@ Créons a present la carte google avec une longLat en parametre
  createMap(position: any){


      //On le converti en un objet de longitude et de latitude de google map
      //lui meme si non la carte ne fonctionnera pas avec les longLat de geolocation
      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

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
  }

  chargerMapSimple(){
    let mapEle: HTMLElement = document.getElementById('map');
    this.map = new google.maps.Map(mapEle, {
      zoom: 12
    });
  }
//@ ici nous definissons les condition de chargement de la carte
  //a savoir la condition de d'affichage de la carte. soit la detection de l'emplacement du telephone

  getPosition(): any {
    // Obtenir la position du telephone
    this.geolocation.getCurrentPosition().then(resp => {
      this.map = this.createMap(resp);
    }).catch((error) => {
      // charger la carte meme si ca foire
      this.chargerMapSimple();

      console.log(error);
    });
  }

  //@ ici nous initialisons l'affichage avec la methode de creation de la carte
   ionViewDidEnter() {
     this.getPosition();
  }


}
