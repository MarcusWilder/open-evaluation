import {
  ElementRef,
  Injectable,
  Injector
} from '@angular/core';
import {
  ConnectedPosition,
  Overlay,
  OverlayConfig
} from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';

import { PicklistDropdownComponent } from '@src/app/components/picklist/picklist-dropdown/picklist-dropdown.component';
import { PicklistDropdownRef } from './picklist-dropdown-ref';

const PICKLIST_DROPDOWN_POSITIONS: ConnectedPosition[] = [
  {
    originX: 'start',
    originY: 'bottom',
    overlayX: 'start',
    overlayY: 'top'
  },
];

@Injectable({
  providedIn: 'root'
})
export class PicklistDropdownService {

  constructor(
    private overlay: Overlay,
    private injector: Injector
  ) { }

  open(origin: ElementRef, options: unknown[]): PicklistDropdownRef {
    const overlayRef = this.overlay.create(this.getPicklistDropdownConfig(origin));
    const picklistDropdownRef = new PicklistDropdownRef(options);
    const injector = this.createInjector(picklistDropdownRef, this.injector);
    overlayRef.attach(new ComponentPortal(PicklistDropdownComponent, null, injector));
    return picklistDropdownRef;
  }

  close() {
    console.log('Close');
  }

  private getPicklistDropdownConfig(origin: ElementRef): OverlayConfig {
    return new OverlayConfig({
      positionStrategy: this.overlay.position()
        .flexibleConnectedTo(origin)
        .withPositions([
          PICKLIST_DROPDOWN_POSITIONS[0]
        ])
    });
  }

  private createInjector(picklistDropdownRef: PicklistDropdownRef, injector: Injector): PortalInjector {
    const tokens = new WeakMap([[PicklistDropdownRef, picklistDropdownRef]]);
    return new PortalInjector(injector, tokens);
  }
}
