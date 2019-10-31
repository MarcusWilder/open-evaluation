import { Component, Input } from '@angular/core';

import { Button } from '@src/app/types/button';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html'
})
export class PageHeaderComponent {

  @Input() subtitle: string;
  @Input() title = 'Page Header';

  @Input() set icon(value: string) {
    this.graphic = value;
    this.symbol = `/assets/icons/standard-sprite/svg/symbols.svg#${value}`;
    this.iconClass = `slds-icon-standard-${value}`;
  }

  buttons: Button[] = [
    { type: 'destructive', content: 'Logout', onClick: () => { console.log('Logged Out'); } }
  ];
  graphic: string;
  iconClass: string;
  symbol: string;
}
