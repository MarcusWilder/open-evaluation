import { Injectable, Injector } from '@angular/core';
import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { ToastComponent } from '../../components/toast/toast.component';
import { ToastType } from '../../types/toast-types';
import { ToastRef } from './toast-ref';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(
    private overlay: Overlay,
    private injector: Injector
    ) { }

  open(title: string, description: string, type: ToastType): ToastRef {
    const overlayRef = this.overlay.create(this.getToastConfig());
    const toastRef = new ToastRef(overlayRef, title, description, type);
    const injector = this.createInjector(toastRef, this.injector);
    overlayRef.attach(new ComponentPortal(ToastComponent, null, injector));
    return toastRef;
  }

  private getToastConfig(): OverlayConfig {
    return new OverlayConfig({
      positionStrategy: this.overlay.position().global()
    });
  }

  private createInjector(toastRef: ToastRef, injector: Injector): PortalInjector {
    const tokens = new WeakMap([[ToastRef, toastRef]]);
    return new PortalInjector(injector, tokens);
  }
}
