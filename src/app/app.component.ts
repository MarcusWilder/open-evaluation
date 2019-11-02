import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MockdataService } from './services/mockdata/mockdata.service';
import { SURVEYS } from '@src/app/mock-data/mock-surveys';
import { flatMap, tap } from 'rxjs/operators';

const API_SERVER_URL = `http://openeval.gatech.edu:4201`;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private router: Router) {}

  ngOnInit() {
  }

}
