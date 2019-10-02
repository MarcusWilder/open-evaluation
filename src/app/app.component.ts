import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

const API_SERVER_URL = `http://openeval.gatech.edu:4201`;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private router: Router) {}

  ngOnInit() {
    console.log('App init!');
    let url = new URL(window.location.href);
    let params = new URLSearchParams(url.search);
    let ticket = params.get('ticket');
    fetch(`${API_SERVER_URL}/validate?ticket=${ticket}`, { credentials: 'include' })
      .then(res => res.json())
      .then(json => {
        if (json.loggedIn) {
          this.router.navigateByUrl('/dashboard');
          console.log('user:', json.info);
        } else {  
          this.router.navigateByUrl('/home');
          console.log('reason:', json.reason);
        }
      })
      .catch(err => {
        console.warn(err, 'Did you forget to start the authentication server?');
      })
  }

}
