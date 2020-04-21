import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthComponent } from './auth/auth/auth.component';
import { AuthLayoutComponent } from './auth/auth-layout/auth-layout.component';


const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent    
  },
  {
    path: 'forgotPassword',
    component: AuthLayoutComponent    
  },
  {
    path: '',
    component: AuthLayoutComponent    
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
