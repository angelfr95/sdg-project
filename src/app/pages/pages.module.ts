import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestComponent } from './test/test.component';
import { HomeComponent } from './home/home.component';



@NgModule({
  declarations: [
    HomeComponent,
    TestComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HomeComponent,
    TestComponent
  ]
})
export class PagesModule { }
