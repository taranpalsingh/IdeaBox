import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ButtonComponent } from './UI/button/button.component';
import { AuthComponent } from './auth/auth/auth.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LoaderComponent } from './UI/loader/loader.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthLayoutComponent } from './auth/auth-layout/auth-layout.component';
import { CarouselComponent } from './UI/carousel/carousel.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { DotsLoaderComponent } from './UI/dots-loader/dots-loader.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ButtonComponent,
    AuthComponent,
    LoaderComponent,
    AuthLayoutComponent,
    CarouselComponent,
    ForgotPasswordComponent,
    DotsLoaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
