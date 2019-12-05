import { FormsModule } from '@angular/forms';
import { NativeScriptModule } from 'nativescript-angular/nativescript.module';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { OverlayModule } from '@angular/cdk/overlay';

import { AppRoutingModule } from '@src/app/app-routing.module';
import { AppComponent } from '@src/app/app.component';
import { HomeComponent } from '@src/app/pages/home/home.component';
import { ToastComponent } from '@src/app/components/toast/toast.component';
import { ButtonComponent } from '@src/app/components/button/button.component';
import { InputComponent } from '@src/app/components/input/input.component';
import { PageHeaderComponent } from '@src/app/components/page-header/page-header.component';
import { RadioButtonGroupComponent } from '@src/app/components/radio-button-group/radio-button-group.component';
import { RadioGroupComponent } from '@src/app/components/radio-group/radio-group.component';
import { BrandBandComponent } from '@src/app/components/brand-band/brand-band.component';
import { GlobalNavigationComponent } from '@src/app/components/global-navigation/global-navigation.component';
import { TestComponent } from '@src/app/test/test.component';
import { ComboboxComponent } from '@src/app/components/picklist/combobox/combobox.component';
import { PicklistDropdownComponent } from '@src/app/components/picklist/picklist-dropdown/picklist-dropdown.component';
import { AccordionComponent } from '@src/app/components/accordion/accordion.component';
import { CardComponent } from '@src/app/components/card/card.component';
import { ProfessorDashboardComponent } from '@src/app/pages/professor-dashboard/professor-dashboard.component';
import { CreateSurveyComponent } from '@src/app/pages/create-survey/create-survey.component';
import { StudentDashboardComponent } from '@src/app/pages/student-dashboard/student-dashboard.component';
import { SurveyTemplateComponent } from '@src/app/components/survey-template/survey-template.component';
import { TakeSurveyComponent } from '@src/app/pages/take-survey/take-survey.component';
import { CheckboxComponent } from '@src/app/components/checkbox/checkbox.component';
import { ViewResultsComponent } from '@src/app/pages/view-results/view-results.component'



// Uncomment and add to NgModule imports if you need to use two-way binding
// import { NativeScriptFormsModule } from 'nativescript-angular/forms';

// Uncomment and add to NgModule imports  if you need to use the HTTP wrapper
// import { NativeScriptHttpClientModule } from 'nativescript-angular/http-client';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ToastComponent,
    ButtonComponent,
    InputComponent,
    PageHeaderComponent,
    RadioButtonGroupComponent,
    BrandBandComponent,
    GlobalNavigationComponent,
    TestComponent,
    RadioGroupComponent,
    ComboboxComponent,
    PicklistDropdownComponent,
    AccordionComponent,
    CardComponent,
    ProfessorDashboardComponent,
    CreateSurveyComponent,
    StudentDashboardComponent,
    SurveyTemplateComponent,
    TakeSurveyComponent,
    CheckboxComponent,
    ViewResultsComponent
  ],
  imports: [
    AppRoutingModule,
    FormsModule,
    NativeScriptModule,
    OverlayModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    PicklistDropdownComponent,
    ToastComponent
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule { }
