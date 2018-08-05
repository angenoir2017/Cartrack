import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import {TranportPublicPage} from "../tranport-public/tranport-public";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab0Root = HomePage;
  tab1Root = TranportPublicPage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;

  constructor() {

  }
}
