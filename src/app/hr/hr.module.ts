import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HrLoginComponent } from '../hr-login/hr-login.component';



@NgModule({
  declarations: [HrLoginComponent],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule
  ],
  exports: [
    CommonModule,
    BrowserModule,
    FormsModule
  ]
})
export class HrModule { }
