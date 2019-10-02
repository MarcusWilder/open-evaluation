import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { OverlayModule } from '@angular/cdk/overlay';
import { HttpClientModule }    from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { InMemoryDataService }  from './services/in-memory-data/in-memory-data.service';

import { AccordionComponent } from '@src/app/components/accordion/accordion.component';
import { AppComponent } from '@src/app/app.component';
import { AppRoutingModule } from '@src/app/app-routing.module';
import { BrandBandComponent } from '@src/app/components/brand-band/brand-band.component';
import { ButtonComponent } from '@src/app/components/button/button.component';
import { ButtonGroupComponent } from '@src/app/components/button-group/button-group.component';
import { CardComponent } from '@src/app/components/card/card.component';
import { ComboboxComponent } from '@src/app/components/picklist/combobox/combobox.component';
import { DashboardComponent } from '@src/app/dashboard/dashboard.component';
import { GlobalNavigationComponent } from '@src/app/components/global-navigation/global-navigation.component';
import { HomeComponent } from '@src/app/home/home.component';
import { InputComponent } from '@src/app/components/input/input.component';
import { PageHeaderComponent } from '@src/app/components/page-header/page-header.component';
import { PicklistDropdownComponent } from '@src/app/components/picklist/picklist-dropdown/picklist-dropdown.component';
import { RadioButtonGroupComponent } from '@src/app/components/radio-button-group/radio-button-group.component';
import { RadioGroupComponent } from '@src/app/components/radio-group/radio-group.component';
import { ToastComponent } from '@src/app/components/toast/toast.component';
import { TestComponent } from '@src/app/test/test.component';

@NgModule({
  declarations: [
    AccordionComponent,
    AppComponent,
    BrandBandComponent,
    ButtonComponent,
    ButtonGroupComponent,
    CardComponent,
    ComboboxComponent,
    DashboardComponent,
    GlobalNavigationComponent,
    HomeComponent,
    InputComponent,
    PageHeaderComponent,
    PicklistDropdownComponent,
    RadioButtonGroupComponent,
    RadioGroupComponent,
    ToastComponent,
    TestComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    OverlayModule,
    HttpClientModule,
    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    )
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    PicklistDropdownComponent,
    ToastComponent
  ]
})
export class AppModule { }
