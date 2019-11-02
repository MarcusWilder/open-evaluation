import { Component, Input } from '@angular/core';

import { Button } from '@src/app/types/button';
import { Router } from '@angular/router';
import { UserService } from '@src/app/services/user/user.service';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html'
})
export class PageHeaderComponent {

  @Input() subtitle: string;
  @Input() title = 'Page Header';

  constructor(private router: Router, private userService: UserService) {}

  @Input() set icon(value: string) {
    this.graphic = value;
    this.symbol = `/assets/icons/standard-sprite/svg/symbols.svg#${value}`;
    this.iconClass = `slds-icon-standard-${value}`;
  }

  private logout = () => {
    this.userService.logOut();
    this.router.navigateByUrl('/');
  }
  buttons: Button[] = [
    { type: 'destructive', content: 'Logout', onClick: this.logout.bind(this) }
  ];
  graphic: string;
  iconClass: string;
  symbol: string;
}
