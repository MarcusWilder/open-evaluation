import { Component, OnInit } from '@angular/core';
import { HttpClient } from 'selenium-webdriver/http';
import { UserService } from '@src/app/services/user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string = '';
  password: string = '';

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  login() {
    this.userService.login(this.username, this.password).subscribe((user) => {
      if (user.role === 'student') {
        this.router.navigateByUrl('/student-dashboard');
      } else {
        this.router.navigateByUrl('/professor-dashboard');
      }
    })
  }

}
