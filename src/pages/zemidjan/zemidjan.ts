import { Component ,ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams,Platform } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import leaflet from 'leaflet';


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
  @ViewChild('map') mapContainer: ElementRef;
  map:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private geo: Geolocation, private platform: Platform) {
    platform.ready().then(() => {
      this.geo.getCurrentPosition().then(resp => {
        console.log(resp.coords.latitude);
        console.log(resp.coords.longitude);
      }).catch((error) => {
        console.log('Error getting location', error);
      });


    });
  }



    loadmap()
    {
      if (this.map){
        this.map.remove();
      }
      this.map = leaflet.map("map").fitWorld();
      leaflet.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attributions: 'www.tphangout.com',
        maxZoom: 18
      }).addTo(this.map);
      this.map.locate({
        setView: true,
        maxZoom: 200
      }).on('locationfound', (e) => {
        let markerGroup = leaflet.featureGroup();
        let marker: any = leaflet.marker([e.latitude,e.longitude]).on('click', () => {
          marker.bindPopup("adidogome").openPopup();
        })
        markerGroup.addLayer(marker);
        this.map.addLayer(markerGroup);
      }).on('locationerror', (err) => {
        alert(err.message);
      })

    }

    ionViewCanLeave()
    {
      document.getElementById("map").outerHTML = "";
    }


  ionViewDidEnter () {
    this.loadmap();
  }


  }

