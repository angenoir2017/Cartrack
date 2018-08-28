import { Component,  NgZone,ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
declare var google;
import {googlemaps} from 'googlemaps';
import {ILatLng} from "@ionic-native/google-maps";



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
  @ViewChild('map') mapElement: ElementRef;
  autocompleteItems: any;
  autocomplete: any;
  GoogleAutocomplete:any;
  placesService: any;

  map: any;


  constructor(public navCtrl: NavController,public navParams: NavParams, public zone: NgZone, private geolocation: Geolocation) {
    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
    this.autocomplete = { input: '' };
    this.autocompleteItems = [];




  }

//@ ici nous initialisons l'affichage avec la methode de creation de la carte
  ionViewDidLoad() {
   this.initializeMap();

  }
//@ ici nous definissons les condition de chargement de la carte
  //a savoir la condition de d'affichage de la carte. soit la detection de l'emplacement du telephone


  initializeMap() {



    let locationOptions = {timeout: 10000, enableHighAccuracy: true};

    this.geolocation.getCurrentPosition(locationOptions).then((position) => {

      let options = {
        center: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
        zoom: 16,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }

      /* Show our lcoation */
      this.map = new google.maps.Map(document.getElementById("map"), options);

      /* We can show our location only if map was previously initialized */
      this.showMyLocation();
      //init autocomplete


    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  showMyLocation(){


    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter()
    });

    let markerInfo = "<h4>You are here!</h4>";

    let infoModal = new google.maps.InfoWindow({
      content: markerInfo
    });

    google.maps.event.addListener(marker, 'click', () => {
      infoModal.open(this.map, marker);
    });
  }



  //pour la recherche de place
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





}
