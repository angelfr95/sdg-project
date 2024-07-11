import { NgModule } from '@angular/core';
import { MenuComponent } from './menu/menu.component';
import { MaterialModule } from '../material.module';
import { AppRoutingModule } from '../app-routing.module';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    MenuComponent,
  ],
  imports: [
    MaterialModule,
    AppRoutingModule,
    CommonModule
  ],
  exports: [
    MenuComponent,
  ]
})
export class LayoutModule { }
