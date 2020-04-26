import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthComponent } from './auth/auth/auth.component';
import { AuthLayoutComponent } from './auth/auth-layout/auth-layout.component';
import { AuthGuardService } from './auth/auth-guard.service';
import { DashboardComponent } from './dashboard/dashboard.component';


const routes: Routes = [

  {
    path: 'forgotPassword',
    component: AuthLayoutComponent    
  },
  {
    path: '',
    component: AuthLayoutComponent    
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuardService]   
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuardService]   
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
