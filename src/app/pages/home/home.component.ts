import { Component } from '@angular/core';
import { User, UserService } from '@src/app/services/user/user.service';
import { Router } from '@angular/router';
import { ToastService } from '@src/app/services/toast/toast.service';

const CALLBACK_URL = `http://openeval.gatech.edu:4200/dashboard`;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {

  constructor(
    private router: Router,
    private userService: UserService,
    private toastService: ToastService
  ) {
    this.login = this.login.bind(this);
    this.displayLogin = this.displayLogin.bind(this);
  }

  tabs = ['Home', 'Features', 'Resources'];
  activeTab: string;

  username = '';
  password = '';
  showLogin = false;
  loading = false;

  displayLogin() {
    if (window.localStorage.getItem('cookie')) {
      this.userService.user$.subscribe((user) => {
        if (!user) {
          window.localStorage.removeItem('cookie');
          this.showLogin = true;
        } else {
          this.router.navigateByUrl(`/${user.role}-dashboard`);
        }
      })
    } else {
      this.showLogin = true;
    }
  }

  login() {
    this.loading = true;
    this.userService.login(this.username, this.password).subscribe((user) => {
      this.loading = false;
      if (!user) {
        this.loading = false;
        this.toastService.open('Login Failed', 'Please enter correct username and password.', 'error');
        return;
      }
      this.router.navigateByUrl(`/${user.role}-dashboard`);
    })
  }

  cancel() {
    this.showLogin = false;
  }

}
