import { Component , ViewChild, ElementRef} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Geolocation} from '@ionic-native/geolocation';
declare var google;
/**
 * Generated class for the TaxiPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-taxi',
  templateUrl: 'taxi.html',
})
export class TaxiPage {
  @ViewChild('map') mapElement: ElementRef;
  map: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public geolocation: Geolocation) {
  }
  ionViewDidLoad() {
    this.LoadMap();
  }
  LoadMap() {
    this.geolocation.getCurrentPosition().then((position) =>{
    let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.latitude);
    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
  }, (err) => {
      console.log(err);
    });
    }
    addMarker(){
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.Drop,
      position: this.map.getCenter()
    });

        var infoWindowContent = '<div id="content"><h1 id="firstHeading" class="firstHeading">' + marker.title + '</h1></div>';
        var infoWindow = new google.maps.InfoWindow({
          content: infoWindowContent
        });
        marker.addListener('click', () => {
          infoWindow.open(this.map, marker);
        });

    }

  ionViewDidEnter() {
    console.log('ionViewDidLoad TaxiPage');
  }


}
