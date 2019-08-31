import { Component, Input } from '@angular/core';
import { BrandBandType } from '@src/app/types/brand-band-types';

@Component({
  selector: 'app-brand-band',
  templateUrl: './brand-band.component.html',
  styleUrls: ['./brand-band.component.css']
})
export class BrandBandComponent {

  @Input() set type(value: BrandBandType) {
    this.variation = `slds-brand-band_${value}`;
  }

  variation: string;
}
