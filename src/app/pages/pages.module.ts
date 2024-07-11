import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestComponent } from './test/test.component';
import { HomeComponent } from './home/home.component';
import { MaterialModule } from '../material.module';



@NgModule({
  declarations: [
    HomeComponent,
    TestComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    HomeComponent,
    TestComponent
  ]
})
export class PagesModule { }