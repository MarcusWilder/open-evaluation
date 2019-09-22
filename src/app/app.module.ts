import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { OverlayModule } from '@angular/cdk/overlay';

import { AppComponent } from '@src/app/app.component';
import { AppRoutingModule } from '@src/app/app-routing.module';
import { BrandBandComponent } from '@src/app/components/brand-band/brand-band.component';
import { ButtonComponent } from '@src/app/components/button/button.component';
import { ButtonGroupComponent } from '@src/app/components/button-group/button-group.component';
import { DashboardComponent } from '@src/app/dashboard/dashboard.component';
import { GlobalNavigationComponent } from '@src/app/components/global-navigation/global-navigation.component';
import { HomeComponent } from '@src/app/home/home.component';
import { InputComponent } from '@src/app/components/input/input.component';
import { PageHeaderComponent } from '@src/app/components/page-header/page-header.component';
import { RadioButtonGroupComponent } from '@src/app/components/radio-button-group/radio-button-group.component';
import { RadioGroupComponent } from '@src/app/components/radio-group/radio-group.component';
import { ToastComponent } from '@src/app/components/toast/toast.component';
import { TestComponent } from '@src/app/test/test.component';


@NgModule({
  declarations: [
    AppComponent,
    BrandBandComponent,
    ButtonComponent,
    ButtonGroupComponent,
    DashboardComponent,
    GlobalNavigationComponent,
    HomeComponent,
    InputComponent,
    PageHeaderComponent,
    RadioButtonGroupComponent,
    RadioGroupComponent,
    ToastComponent,
    TestComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    OverlayModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ToastComponent]
})
export class AppModule { }
