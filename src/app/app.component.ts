import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './services/user/user.service';

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
