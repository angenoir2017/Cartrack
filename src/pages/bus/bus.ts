import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';





@IonicPage()
@Component({
  selector: 'page-bus',
  templateUrl: 'bus.html',
})
export class BusPage {
  public map;
  menus =[
    {title:'Paiement de tickéts', icon: 'cash', icon1: 'md-arrow-dropright'},
    {title:'Itinéraire de Bus', icon: 'md-locate', icon1: 'md-arrow-dropright'},
    {title:'Entreprise de transports', icon: 'bus', icon1: 'md-arrow-dropright'},
    {title:'Arrêt de bus', icon: 'flag', icon1:'md-arrow-dropright'},
    {title:'Historique', icon: 'md-sync', icon1:'md-arrow-dropright'},
    {title:'Favoris', icon: 'star', icon1:'md-arrow-dropright'}
  ];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  //@ Créons a present la carte google avec une longLat en parametre


  ionViewDidLoad() {

  }

}
