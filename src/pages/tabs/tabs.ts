import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import {BusPage} from "../bus/bus";
import {TaxiPage} from "../taxi/taxi";
import {ZemidjanPage} from "../zemidjan/zemidjan";


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab0Root = HomePage;
  tab1Root = BusPage;
  tab2Root = TaxiPage;
  tab3Root = ZemidjanPage;
  tab4Root = ContactPage;

  constructor() {

  }
}
