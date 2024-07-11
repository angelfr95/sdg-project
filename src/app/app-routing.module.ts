import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import appConfig from '../assets/config/app-config.json';
import { HomeComponent } from './pages/home/home.component';
import { TestComponent } from './pages/test/test.component';

const publicRoutes: Routes = [
  { path: appConfig.ROUTE_HOME, component: HomeComponent },
  { path: appConfig.ROUTE_TEST, component: TestComponent },
  { path: '', redirectTo: appConfig.ROUTE_HOME, pathMatch: 'full' },
  { path: '**', redirectTo: appConfig.ROUTE_HOME },
];

const baseRoutes: Routes = [...publicRoutes];

@NgModule({
  imports: [RouterModule.forRoot(baseRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
