import { Component, OnInit } from '@angular/core';

const CALLBACK_URL = `http://openeval.gatech.edu:4200/dashboard`;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

  constructor() { }

  tabs = ['Home', 'Features', 'Resources'];
  activeTab: string;

  ngOnInit() {
  }

  login() {
  }

}
