import { ToastType } from 'src/app/types/toast-types';
import { OverlayRef } from '@angular/cdk/overlay';

export class ToastRef {

  constructor(
    private overlayRef: OverlayRef,
    public title: string,
    public description: string,
    public type: ToastType
  ) {}

  close() {
    this.overlayRef.dispose();
  }
}