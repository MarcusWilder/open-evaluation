import { Component, OnInit } from '@angular/core';

const API_SERVER_URL = `http://openeval.gatech.edu:4201`;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  logOut() {
    fetch(`${API_SERVER_URL}/logout`, { credentials: 'include' })
      .then(() => {
        window.location.href = 'https://login.gatech.edu/cas/logout';
      });
  }

}
