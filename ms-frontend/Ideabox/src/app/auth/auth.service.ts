import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, BehaviorSubject } from 'rxjs';
import { catchError, tap, take } from 'rxjs/operators';
import { User } from './user.module';
import * as config from '../../../config';

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
    private http: HttpClient
  ) { }

  signup(credentials){
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
            +resData.expiresIn
          );  
        }) 
      )
  }

  login(credentials){
    credentials["returnSecureToken"] = true;
    return this.http.post<AuthResponseData>(this.loginUrl, credentials)
      .pipe(
          catchError(this.errorHandler),
          tap(resData => {
            this.handleAuthentication(
              resData.email,
              resData.localId,
              resData.idToken,
              +resData.expiresIn,
            )
          })
      )
  }

  forgotPassword(passwordsObject){

    // not the correct URL
    return this.http.post<AuthResponseData>(this.loginUrl, passwordsObject)
      .pipe(
          catchError(this.errorHandler),
          tap(resData => {
            this.handleAuthentication(
              resData.email,
              resData.localId,
              resData.idToken,
              +resData.expiresIn,
            )
          })
      )
  }

  // Call this method after auth, to store the current user details.
  private handleAuthentication(email: string, userId: string, token: string, expiresIn: number){
    
    // calculating expiration date using the expiresIn
    const ExpirationDate = new Date(new Date().getTime() + expiresIn * 1000);

    const user = new User(
      email,
      userId,
      token,
      ExpirationDate
    )
    
    // updating the current user
    this.user.next(user);
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
