import { Component, OnInit } from '@angular/core';
import { EventData } from 'tns-core-modules/data/observable';
import { Router } from '@angular/router';


const CALLBACK_URL = `http://openeval.gatech.edu:4200/dashboard`;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) { }

  tabs = ['Home', 'Features', 'Resources'];
  activeTab: string;

  ngOnInit() {
    console.log('onInit');
  }

  login() {
    window.location.href = `https://login.gatech.edu/cas/login?service=${
      encodeURIComponent(CALLBACK_URL)
    }`;
  }

  mockLogin() {
    console.log('hello');
  }

  studentOnTap(args: EventData) {
    this.router.navigate(['student-dashboard']);
  }

  professorOnTap(args: EventData) {
    this.router.navigate(['professor-dashboard']);
  }

  onSurveyTap(args: EventData) {
    this.router.navigate(['create-survey']);
  }

}
