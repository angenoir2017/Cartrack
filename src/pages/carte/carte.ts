
import { Component, NgZone, ViewChild, ElementRef } from '@angular/core';
import { IonicPage,NavController, Platform} from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Observable } from 'rxjs/Observable';
declare var google: any;


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
  @ViewChild('searchbar', { read: ElementRef }) searchbar: ElementRef;
  addressElement: HTMLInputElement = null;
  search: boolean = false;
  error: any;
  public latitude: any;
  public longitude: any;
  destinationclient: any = '';
  MyLocation: any;
  map: any;
  switch: string = "map";



  constructor(public navCtrl: NavController,

              public zone: NgZone,
              private geolocation: Geolocation,
               public platform: Platform,) {





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
      this.initAutocomplete();


    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }


  initAutocomplete(): void {
    // reference : https://github.com/driftyco/ionic/issues/7223
    this.addressElement = this.searchbar.nativeElement.querySelector('.searchbar-input');
    this.createAutocomplete(this.addressElement).subscribe((location) => {
      console.log('Searchdata', location);

      let options = {
        center: location,
        zoom: 10
      };
      this.map.setOptions(options);
      this.addMarker(location, "Mein gesuchter Standort");


    });
  }

  createAutocomplete(addressEl: HTMLInputElement): Observable<any> {
    const autocomplete = new google.maps.places.Autocomplete(addressEl);
    autocomplete.bindTo('bounds', this.map);
    return new Observable((sub: any) => {
      google.maps.event.addListener(autocomplete, 'place_changed', () => {
        const place = autocomplete.getPlace();
        if (!place.geometry) {
          sub.error({
            message: 'Autocomplete returned place with no geometry'
          });
        } else {

          console.log('Search Lat', place.geometry.location.lat());
          console.log('Search Lng', place.geometry.location.lng());
          sub.next(place.geometry.location);
         // sub.complete();
        }

      });
    });
  }
  mapsSearchBar(ev: any) {
    // set input to the value of the searchbar
    this.search = ev.target.value;
    console.log(ev);
    const autocomplete = new google.maps.places.Autocomplete(ev);
    autocomplete.bindTo('bounds', this.map);
    return new Observable((sub: any) => {
      google.maps.event.addListener(autocomplete, 'place_changed', () => {
        const place = autocomplete.getPlace();
        if (!place.geometry) {
          sub.error({
            message: 'Autocomplete returned place with no geometry'
          });
        } else {
          sub.next(place.geometry.location);
          //sub.complete();
        }

      });
    });
  }
  addMarker(position, content) {
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: position
    });
    return marker;


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



}
