import { Component, Input } from '@angular/core';

import { Button } from '@src/app/types/button';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {

  @Input() cardButtons: Button[];
  @Input() set icon(value: string) {
    this.graphic = value;
    this.symbol = `/assets/icons/standard-sprite/svg/symbols.svg#${value}`;
    this.iconClass = `slds-icon-standard-${value}`;
  }
  @Input() title = 'Card';

  graphic: string;
  iconClass: string;
  symbol: string;
}
