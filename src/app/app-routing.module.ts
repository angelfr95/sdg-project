import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import appConfig from '../assets/config/app-config.json';
import { ContinentsComponent } from './pages/continents/continents.component';
import { CountriesComponent } from './pages/countries/countries.component';

const publicRoutes: Routes = [
  { path: appConfig.ROUTE_CONTINENTS, component: ContinentsComponent },
  { path: appConfig.ROUTE_COUNTRIES, component: CountriesComponent },
  { path: '', redirectTo: appConfig.ROUTE_CONTINENTS, pathMatch: 'full' },
  { path: '**', redirectTo: appConfig.ROUTE_CONTINENTS },
];

const baseRoutes: Routes = [...publicRoutes];

@NgModule({
  imports: [RouterModule.forRoot(baseRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
