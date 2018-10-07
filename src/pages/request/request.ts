import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

declare var google;
/**
 * Generated class for the RequestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-request',
  templateUrl: 'request.html',
})
export class RequestPage {

  public latitude: any;
  public longitude: any;
Destination:any;
  MyLocation: any;
  Destinationname:any;
  trajetdistance:any;
  trajetduration:any;

  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;
  travelType:any = 'DRIVING';

  //distance and duration
  distance:any='';
  duration:any='';
  test:any;
  map: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public geolocation: Geolocation) {
  }

  ionViewDidLoad(){
    this.calculateAndDisplayRoute();
    this.getDirections();
    this.Destinationname=this.navParams.get('param3');
  }



  calculateAndDisplayRoute() {

    this.Destination= this.navParams.get('param1');
    this.MyLocation= this.navParams.get('param2');
    this.Destinationname=this.navParams.get('param3');
    console.log('my location',this.MyLocation);
    console.log('my location',this.Destination);
    let directionsService = new google.maps.DirectionsService;
    let directionsDisplay = new google.maps.DirectionsRenderer;
    const map = new google.maps.Map(document.getElementById('map_canvas'), {
      zoom: 1,
    });
    directionsDisplay.setMap(map);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        map.setCenter(pos);

      }, function() {

      });
    } else {
      // Browser doesn't support Geolocation
    }

    directionsService.route({
      origin: this.MyLocation,
      destination: this.Destination,
      travelMode: 'DRIVING'
    }, function(response, status) {
      if (status === 'OK') {
        directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }
  getDirections(){

    this.directionsDisplay.setMap(this.map);


    this.directionsService.route({
      origin : this.MyLocation,
      destination : this.Destination,
      optimizeWaypoints: true,
      travelMode : this.travelType,
      provideRouteAlternatives: true,
    }, (response, status) => {
      if (status == google.maps.DirectionsStatus.OK) {
        this.directionsDisplay.setDirections(response);
        // Create a new DirectionsRenderer for each route
        for (var i = 0; i < response.routes.length; i++) {
          var dr = new google.maps.DirectionsRenderer();
          dr.setDirections(response);
          // Tell the DirectionsRenderer which route to display
          dr.setRouteIndex(i);
          dr.setMap(this.map);

          // Code ommited to display distance and duration
          let x = i+1;
          // Display the distance:
         this.trajetdistance=  this.distance = 1 +') '+ response.routes[0].legs[0].distance.text +', ' ;
          this.distance += x +') '+ response.routes[i].legs[0].distance.text +', ' ;
          console.log('distance',this.distance);
          // Display the duration:
          this.trajetduration= response.routes[0].legs[0].duration.text +', ' ;
          this.duration += x +') '+ response.routes[i].legs[0].duration.text +', ' ;
          console.log('duration',this.duration);
        }

        // this.directionsDisplay.setDirections(response);
        console.log('response:-',response);
      } else {
        alert('Directions request failed due to ' + status);
      }
    });
  }


}

