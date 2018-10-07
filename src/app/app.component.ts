import { Component} from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';



import { ContactPage } from '../pages/contact/contact';
import { BusPage } from '../pages/bus/bus';
import { ZemidjanPage } from '../pages/zemidjan/zemidjan';
import { TaxiPage } from '../pages/taxi/taxi';
import {ParametrePage} from "../pages/parametre/parametre";
import {CartePage} from "../pages/carte/carte";



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any =CartePage;

  menus =[
    {title:'Cartrack', icon: 'map', icon1: 'md-arrow-dropright',component: CartePage},
    {title:'Bus', icon: 'bus',icon1: 'md-arrow-dropright', component: BusPage},
    {title:'Zemidjan', icon: 'bicycle',icon1: 'md-arrow-dropright', component: ZemidjanPage},
    {title:'Taxi', icon: 'car' ,icon1: 'md-arrow-dropright',component:TaxiPage},
    {title:'Paiement', icon: 'card' ,icon1: 'md-arrow-dropright',component:TaxiPage},
    {title:'Partager', icon: 'share' ,icon1: 'md-arrow-dropright',component:TaxiPage},
    {title:'Profil', icon: 'person' ,icon1: 'md-arrow-dropright',component:TaxiPage},
    {title:'Paramètres', icon: 'md-settings',icon1: 'md-arrow-dropright', component: ParametrePage},
    {title:'Contact', icon: 'information',icon1: 'md-arrow-dropright', component: ContactPage}
  ];

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
  onPage(m){
    //  console.log("Ca marche le click");
    this.rootPage= m.component;
  }
}
