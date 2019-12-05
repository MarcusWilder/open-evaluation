import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { OverlayModule } from '@angular/cdk/overlay';
import { HttpClientModule } from '@angular/common/http';
import { AccordionComponent } from '@src/app/components/accordion/accordion.component';
import { AppComponent } from '@src/app/app.component';
import { AppRoutingModule } from '@src/app/app-routing.module';
import { BrandBandComponent } from '@src/app/components/brand-band/brand-band.component';
import { ButtonComponent } from '@src/app/components/button/button.component';
import { CardComponent } from '@src/app/components/card/card.component';
import { ComboboxComponent } from '@src/app/components/picklist/combobox/combobox.component';
import { CreateSurveyComponent } from '@src/app/pages/create-survey/create-survey.component';
import { GlobalNavigationComponent } from '@src/app/components/global-navigation/global-navigation.component';
import { HomeComponent } from '@src/app/pages/home/home.component';
import { InputComponent } from '@src/app/components/input/input.component';
import { PageHeaderComponent } from '@src/app/components/page-header/page-header.component';
import { PicklistDropdownComponent } from '@src/app/components/picklist/picklist-dropdown/picklist-dropdown.component';
import { ProfessorDashboardComponent } from '@src/app/pages/professor-dashboard/professor-dashboard.component';
import { RadioButtonGroupComponent } from '@src/app/components/radio-button-group/radio-button-group.component';
import { RadioGroupComponent } from '@src/app/components/radio-group/radio-group.component';
import { StudentDashboardComponent } from '@src/app/pages/student-dashboard/student-dashboard.component';
import { ToastComponent } from '@src/app/components/toast/toast.component';
import { TestComponent } from '@src/app/test/test.component';
import { SurveyTemplateComponent } from '@src/app/components/survey-template/survey-template.component';
import { TakeSurveyComponent } from '@src/app/pages/take-survey/take-survey.component';
import { CheckboxComponent } from '@src/app/components/checkbox/checkbox.component';
import { ViewResultsComponent } from '@src/app/pages/view-results/view-results.component';

@NgModule({
  declarations: [
    AccordionComponent,
    AppComponent,
    BrandBandComponent,
    ButtonComponent,
    CardComponent,
    ComboboxComponent,
    CreateSurveyComponent,
    GlobalNavigationComponent,
    HomeComponent,
    InputComponent,
    PageHeaderComponent,
    PicklistDropdownComponent,
    ProfessorDashboardComponent,
    RadioButtonGroupComponent,
    RadioGroupComponent,
    StudentDashboardComponent,
    ToastComponent,
    TestComponent,
    SurveyTemplateComponent,
    TakeSurveyComponent,
    CheckboxComponent,
    ViewResultsComponent,
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
    // HttpClientInMemoryWebApiModule.forRoot(
    //   InMemoryDataService, { dataEncapsulation: false }
    // )
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    PicklistDropdownComponent,
    ToastComponent
  ]
})
export class AppModule { }
