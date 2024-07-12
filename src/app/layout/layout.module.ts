import { NgModule } from '@angular/core';
import { MenuComponent } from './menu/menu.component';
import { MaterialModule } from '../material.module';
import { AppRoutingModule } from '../app-routing.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    MenuComponent,
    HeaderComponent,
  ],
  imports: [
    MaterialModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    MenuComponent,
    HeaderComponent
  ]
})
export class LayoutModule { }
