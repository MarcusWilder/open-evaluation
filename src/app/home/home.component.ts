import { Component } from '@angular/core';

const CALLBACK_URL = `http://openeval.gatech.edu:4200/dashboard`;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  activeTab: string;
  tabs = ['Home', 'Features', 'Resources'];

  login() {
    window.location.href = `https://login.gatech.edu/cas/login?service=${
      encodeURIComponent(CALLBACK_URL)
    }`;
  }

}
