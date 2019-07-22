import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HrRoutingModule } from './hr-routing.module';
import { EmployeeSearchComponent } from './employee-search/employee-search.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [EmployeeSearchComponent],
  imports: [
    CommonModule,
    HrRoutingModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class HrModule { }
