import { Component } from '@angular/core';
import { User, UserService } from '@src/app/services/user/user.service';
import { Router } from '@angular/router';

const CALLBACK_URL = `http://openeval.gatech.edu:4200/dashboard`;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {

  constructor(private router: Router, private userService: UserService) {
    this.login = this.login.bind(this);
  }

  tabs = ['Home', 'Features', 'Resources'];
  activeTab: string;

  login() {
    if (window.localStorage.getItem('cookie')) {
      this.userService.user$.subscribe((user) => {
        if (!user) {
          window.localStorage.removeItem('cookie');
          this.router.navigateByUrl('/login');
        } else {
          this.router.navigateByUrl(`/${user.role}-dashboard`);
        }
      })
    } else {
      this.router.navigateByUrl('/login');
    }
  }

}
