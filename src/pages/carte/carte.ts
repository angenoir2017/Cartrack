
import { Component, NgZone, ViewChild, ElementRef } from '@angular/core';
import { IonicPage,NavController, Platform, AlertController} from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Observable } from 'rxjs/Observable';

declare var google: any;
//OOOOOOOOOOOOOOOOOO

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
  public Destination: any =null
  MyLocation: any;
  Destinationname:any;
  Url:any;
  MylocationName:string;
  map: any;





  constructor(public navCtrl: NavController,

              public zone: NgZone,
              private geolocation: Geolocation,
               public platform: Platform,
              public alertCtrl: AlertController,
              public toastCtrl: ToastController,
             ) {






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

console.log('géolocation',this.geolocation);
      let options = {
        center: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
        zoom: 16,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
var pos = {
  lat: position.coords.latitude,
  lng: position.coords.longitude
};

      /*let  Options: NativeGeocoderOptions = { useLocale: true, maxResults: 5 };
      this.nativeGeocoder.reverseGeocode( position.coords.latitude,  position.coords.longitude, Options)
        .then((result: NativeGeocoderReverseResult[]) => console.log(JSON.stringify(result[0])))
        .catch((error: any) => console.log(error));*/
      console.log('position information',position);
      this.MyLocation=pos;

      console.log('mylocation',this.MyLocation);
      /* Show our lcoation */
      this.map = new google.maps.Map(document.getElementById("map"), options);
      google.maps.event.addListener(this.map, 'bounds_changed', () => {
        this.zone.run(() => {
          this.resizeMap();
        });
      });
      /* We can show our location only if map was previously initialized */
      this.showMyLocation();
      //init autocomplete
      this.initAutocomplete();


    }).catch((error) => {
      console.log('Error getting location', error);
    });

  }

  resizeMap() {
    setTimeout(() => {
      google.maps.event.trigger(this.map, 'resize');
    }, 200);
  }



//pour trouver le nom de ma location
/*
  getcountry(pos) {

    this.nativeGeocoder.reverseGeocode(pos.coords.latitude, pos.coords.longitude).then((result) => {
this.MylocationName=result[0].locality;
    })

  }*/


  initAutocomplete(): void {
    // reference : https://github.com/driftyco/ionic/issues/7223
    this.addressElement = this.searchbar.nativeElement.querySelector('.searchbar-input');
    this.createAutocomplete(this.addressElement).subscribe((location) => {

      let options = {
        center: location,
        zoom: 15
      };
      this.map.setOptions(options);
      this.addMarker(location, this.Destinationname);
      console.log('Searchdata', location);
    });


  }


  createAutocomplete(addressEl: HTMLInputElement): Observable<any> {
    const autocomplete = new google.maps.places.Autocomplete(addressEl);
    autocomplete.bindTo('bounds', this.map);
    return new Observable((sub: any) => {
      google.maps.event.addListener(autocomplete, 'place_changed', () => {
        const place = autocomplete.getPlace();
        console.log('place name',place);
        if (!place.geometry) {
          sub.error({
            message: 'Autocomplete returned place with no geometry'
          });
        } else {
          this.Destinationname=place.name;
          this.Url=place.url;
console.log('destination',this.Destinationname);
          console.log(this.Url);
        this.Destination={
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng()
        };
         console.log('objet Destination:',this.Destination);

          console.log('Search Lat', place.geometry.location.lat());
          console.log('Search Lng', place.geometry.location.lng());
          sub.next(place.geometry.location);

         // sub.complete();
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
    this.addInfoWindow(marker, content);
    return marker;

  }
  addInfoWindow(marker, content) {
    let infoWindow = new google.maps.InfoWindow({
      content: content,

    });

    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
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
  request(){
    if(this.Destination){
      this.navCtrl.push('RequestPage', {
        param1: this.Destination,
        param2: this.MyLocation,
        param3: this.Destinationname
      });
    }
    else{

        const alert = this.alertCtrl.create({
          title: 'Erreur!',
          subTitle: 'veuillez sélectionner  une destination dans la barre de recherche !',
          buttons: ['OK']
        });
        alert.present();
      }


  }
  showPrompt() {
    if (this.Destinationname) {


      const prompt = this.alertCtrl.create({
        title: 'Commande!',
        subTitle: "Confirmer votre commandes !",
        message: "Votre destination est sur  " + this.Destinationname+" le lien est "+this.Url,

        inputs: [
          {
            name: 'title',
            placeholder: 'Votre prix'
          },

        ],

        buttons: [
          {
            text: 'Retour',
            handler: data => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'Confirmer',
            handler: data => {
                const toast = this.toastCtrl.create({
                  message: 'Votre commandes a été bien envoyer!',
                  duration: 6000
                });
                toast.present();

              console.log('Saved clicked');
            }
          }
        ]
      });
      prompt.present();
    }
    else{
      const alert = this.alertCtrl.create({
        title: 'Erreur!',
        subTitle: 'veuillez sélectionner  une destination dans la barre de recherche !',
        buttons: ['OK']
      });
      alert.present();
    }
  }

}
