import { Component, OnInit } from '@angular/core';
import { ToastRef } from '@src/app/services/toast/toast-ref';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent implements OnInit { // Need to alter overlay to appear in bottom right of screen

  description: string;
  icon: string;
  title: string;
  variation: string;

  constructor(private toastRef: ToastRef) {}

  ngOnInit() {
    this.title = this.toastRef.title;
    this.description = this.toastRef.description;
    this.variation = `slds-theme_${this.toastRef.type}`;
    this.icon = `/assets/icons/utility-sprite/svg/symbols.svg#${this.toastRef.type}`;
    setTimeout( () => { this.toastRef.close(); }, 10000);
  }

  close() {
    this.toastRef.close();
  }
}