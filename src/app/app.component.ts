import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MockdataService } from './services/mockdata/mockdata.service';
import { SURVEYS } from '@src/app/mock-data/mock-surveys';
import { flatMap, tap, catchError } from 'rxjs/operators';
import { UserService } from './services/user/user.service';
import { of } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  async ngOnInit() {
    let cookie;
    if (cookie = window.localStorage.getItem('cookie')) {
      this.userService.loginWithCookie(cookie).subscribe(user => {});
    } else {
      this.router.navigateByUrl('/home');
    }
  }
}
