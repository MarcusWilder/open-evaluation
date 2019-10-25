import { ElementRef, Injector } from '@angular/core';
import {
  ConnectedPosition,
  Overlay,
  OverlayConfig,
  OverlayRef
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
  {
    originX: 'start',
    originY: 'top',
    overlayX: 'start',
    overlayY: 'bottom'
  }
];

export class PicklistOverlay {

  private overlayRef: OverlayRef;
  private picklistDropdownRef: PicklistDropdownRef;

  constructor(
    private origin: ElementRef,
    private overlay: Overlay,
    private injector: Injector,
    private options: object[],
    private areSelected: boolean[]
  ) { }

  open(): PicklistDropdownRef {
    this.overlayRef = this.overlay.create(this.getPicklistDropdownConfig(this.origin, this.options));
    this.picklistDropdownRef = new PicklistDropdownRef(this.options, this.areSelected);
    const injector = this.createInjector(this.picklistDropdownRef, this.injector);
    this.overlayRef.attach(new ComponentPortal(PicklistDropdownComponent, null, injector));
    return this.picklistDropdownRef;
  }

  close() {
    this.overlayRef.dispose();
  }

  getOverlayRef() {
    return this.overlayRef;
  }

  getPicklistDropdownRef() {
    return this.picklistDropdownRef;
  }

  private getPicklistDropdownConfig(origin: ElementRef, options: object[]): OverlayConfig {
    return new OverlayConfig({
      height: 37 * options.length + 12, // Not a permanent solution
      maxHeight: 203, // Not a permanent solution
      positionStrategy: this.overlay.position()
        .flexibleConnectedTo(origin)
        .withPositions([
          PICKLIST_DROPDOWN_POSITIONS[0],
          PICKLIST_DROPDOWN_POSITIONS[1]
        ])
    });
  }

  private createInjector(picklistDropdownRef: PicklistDropdownRef, injector: Injector): PortalInjector {
    const tokens = new WeakMap([[PicklistDropdownRef, picklistDropdownRef]]);
    return new PortalInjector(injector, tokens);
  }
}
