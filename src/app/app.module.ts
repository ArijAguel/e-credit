import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreditFormComponent } from './credit-form/credit-form.component';
import { AppLayoutModule } from './layout/app.layout.module';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { FieldsetModule } from 'primeng/fieldset';
import { TableModule } from 'primeng/table';
import { MultiSelectModule } from 'primeng/multiselect';
import { SliderModule } from 'primeng/slider';
import { ProgressBarModule } from 'primeng/progressbar';
// For dynamic progressbar demo
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GarantiePopUpComponent } from './garantie-pop-up/garantie-pop-up.component';
import { DialogModule } from 'primeng/dialog';
import { FileUploadModule } from 'primeng/fileupload';
import { ConsultationComponent } from './consultation/consultation.component';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';

import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
















@NgModule({
  declarations: [
    AppComponent,
    CreditFormComponent,
    GarantiePopUpComponent,
    ConsultationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppLayoutModule,
    DropdownModule,
    InputTextModule,
    ButtonModule,
    InputTextareaModule,
    CalendarModule,
    CheckboxModule,
    FieldsetModule,
    TableModule,
    MultiSelectModule,
    SliderModule ,
    ProgressBarModule, 
    ReactiveFormsModule,
    FormsModule,
    DialogModule,
    FileUploadModule,
    HttpClientModule,
    ToastModule
    
,
  ],
  providers: [DatePipe, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
