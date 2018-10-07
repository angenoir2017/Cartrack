import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
		 selectedItem: any;
 images: string[];

  constructor(public navCtrl: NavController,public navParams:NavParams) {
 this.selectedItem = navParams.get('item');
 this.images = ['back.jpg','cgn.jpg','logo.png','slide1.jpg','telechargement.png'];
  }

}
