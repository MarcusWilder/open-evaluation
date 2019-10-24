import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Button } from '@src/app/types/button-group-types';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html'
})
export class PageHeaderComponent {

  @Input() subtitle: string;
  @Input() title = 'Page Header';
  @Input() picklistLabel: string = '';
  @Input() picklistPlaceholder: string = '';

  @Input() set icon(value: string) {
    this.graphic = value;
    this.symbol = `/assets/icons/standard-sprite/svg/symbols.svg#${value}`;
    this.iconClass = `slds-icon-standard-${value}`;
  }
  @Input() options: any[];
  @Input() selection: any;
  @Output() selectionChange = new EventEmitter<any>();

  buttons: Button[] = [
    { type: 'destructive', content: 'Logout', onClick: () => { console.log('Logged Out'); } }
  ];
  graphic: string;
  iconClass: string;
  symbol: string;

  select(selection: any) {
    this.selectionChange.emit(selection);
  }
}
