import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from './user.module';
import * as config from '../../../config';
import { Router } from '@angular/router';

export interface AuthResponseData{
  idToken: string,
  email: string,
  refreshToken: string,
  expiresIn: string,
  localId: string,
  displayName?: string,
  registered?: string
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  user = new BehaviorSubject<User>(null);

  signupUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='+config.API_KEY;
  loginUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='+config.API_KEY;
  
  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  signup(credentials, rememberMe){
    credentials["returnSecureToken"] = true;
    console.log(credentials);
    return this.http.post<AuthResponseData>(this.signupUrl, credentials)
      .pipe(
        catchError(this.errorHandler),
        tap(resData => {

          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            rememberMe
          );  
        }) 
      )
  }

  login(credentials, rememberMe){
    
    credentials["returnSecureToken"] = true;
    return this.http.post<AuthResponseData>(this.loginUrl, credentials)
      .pipe(
        catchError(this.errorHandler),
        tap(resData => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            rememberMe
          )
        })
      )
  }

  forgotPassword(passwordsObject){
    // not the correct URL
    return this.http.post<AuthResponseData>(this.loginUrl, passwordsObject)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  autoLogin(){
    
    // At first, check if token is not there in the sessionStorage 
    if(!sessionStorage.getItem('token')){
      // If it exists in localStorage, then copy it to sessionStorage
      if(localStorage.getItem('token')){
        console.log("Logging In automatically");
        sessionStorage.setItem('token', localStorage.getItem('token'));
        
        let token = sessionStorage.getItem('token');
        this.user.next(JSON.parse(token));

        // redirect to dashboard
        this.router.navigateByUrl("dashboard");
      }
      // if not even in localStorage, then redirect to login page
      else{
        this.router.navigateByUrl("");
      }
    }
  }

  // To check if the user is logged in or not 
  // Need to change the logic behind this
  isLoggedIn(){
    let token = sessionStorage.getItem('token');
    
    // if token exists, then return true
    return token ? true : false;
  }

  logout(){
    sessionStorage.clear();
    localStorage.clear();
    this.router.navigateByUrl("");
  }

  // Call this method after auth, to store the current user details.
  private handleAuthentication(email: string, userId: string, token: string, rememberMe: boolean){
    
    const user = new User(
      email,
      userId,
      token
    )
    
    // updating the current user
    this.user.next(user);
    
    sessionStorage.setItem('token', JSON.stringify(user));

    if(rememberMe){
      localStorage.setItem('token', JSON.stringify(user));
    }
    // this.user.pipe(take(1)).subscribe(user => {console.log(user)});
  }


  private errorHandler(errorRes: HttpErrorResponse){
    let errorMessage = "An unknown error occurred."

    // If the error is not defined.
    if(!errorRes.error || !errorRes.error.error){
      return throwError(errorMessage);
    }
    
    switch(errorRes.error.error.message){
      case "EMAIL_EXISTS":
        errorMessage = "User already exists."
        break;
      case "EMAIL_NOT_FOUND":
        errorMessage = "This email does not exists."
        break;
      case "INVALID_PASSWORD":
        errorMessage = "The password is incorrect."
        break;
    }
    return throwError(errorMessage);
  }
  
}
