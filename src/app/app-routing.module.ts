import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';


const routes: Routes = [
  // first page
  { path: '', redirectTo: 'home', pathMatch: 'full'}, //Start page and if blank redirect to login
  { path: 'home', component: AppComponent, data: { title: 'Home' }},
  // otherwise redirect to home
   { path: '**', redirectTo: 'home' }
];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes, { useHash: false }) ],
})
export class AppRoutingModule {}
