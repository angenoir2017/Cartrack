import { Component} from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';



import { AboutPage } from '../pages/about/about';
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
    {title:'Map', component: CartePage},
    {title:'Bus', component: BusPage},
    {title:'Zemidjan', component: ZemidjanPage},
    {title:'Taxi', component:TaxiPage},
    {title:'Parametre', component: ParametrePage},
    {title:'About', component:AboutPage},
    {title:'Contact', component: ContactPage}
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
