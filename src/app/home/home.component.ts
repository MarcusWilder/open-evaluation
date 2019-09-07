import { Component, OnInit } from '@angular/core';
import { JsonPipe } from '@angular/common';
// import { parseString } from 'xml2js';
// const { parseXML } = parseString;

const CALLBACK_URL = `http://openeval.gatech.edu:4200/home`;
const API_SERVER_URL = `http://openeval.gatech.edu:4201`;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  title = 'open-eval';
  loggedIn = false;
  private _info = null;

  constructor() { }

  get userInfo() {
    return JSON.stringify(this._info, undefined, 2);
  }

  ngOnInit() {
    let url = new URL(window.location.href);
    let params = new URLSearchParams(url.search);
    if (!params.has('ticket')) return;

    let ticket = params.get('ticket');

    fetch(`${API_SERVER_URL}/validate?ticket=${ticket}`)
      .then(res => res.json())
      .then(json => {
        console.log(json);
        this.loggedIn = json.loggedIn;
        this._info = json.info;
      }); 
  }

  login() {
    window.location.href = `https://login.gatech.edu/cas/login?service=${
      encodeURIComponent(CALLBACK_URL)
    }`;
  }

}
