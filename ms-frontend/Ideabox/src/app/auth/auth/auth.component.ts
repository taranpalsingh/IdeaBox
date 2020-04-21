import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService, AuthResponseData } from '../auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  isLoading = false;
  error = "";
  modeSelected = 'login';
  @Output() mode = new EventEmitter;

  // Validators for fullName Input for login 
  fullNameLoginValidators = []
  // Validators for fullName Input for Signup 
  fullNameSignupValidators = [ Validators.required]

  loginForm = new FormGroup({
    fullName: new FormControl("",
        this.modeSelected==="signup" ? this.fullNameSignupValidators : this.fullNameLoginValidators 
    ),
    email: new FormControl("",[
      Validators.required
    ]),
    password: new FormControl("",[
      Validators.required,
      Validators.minLength(5)
    ])
  });

  constructor(
    private authServce: AuthService,
    private router : Router
  ) { }

  ngOnInit() {
  }

  submitForm(){

    // resetting the errorMessage Alert

    console.log(this.loginForm);
    
    if(!this.loginForm.valid){
      console.log("invalid");
      return;
    }

    this.error = "";
    // turn the loader on
    this.isLoading = true;
    let authObs: Observable<AuthResponseData>;
    
    const credentials = {
      email: this.email.value,
      password: this.password.value
    }

    if(this.modeSelected === "login"){
      authObs = this.authServce.login(credentials)
    }
    else if(this.modeSelected === "signup"){
      credentials["fullName"] = this.fullName.value;
      authObs = this.authServce.signup(credentials)
    }

    // subscribe to login or signup requests
    authObs.subscribe(
      res => {
        console.log(res);
        this.isLoading = false;
        this.router.navigateByUrl("home");
      },
      errorMsg => {
        this.isLoading = false;
        this.error = errorMsg
        console.log(errorMsg);
      }
    )

  }

  get email(){
    return this.loginForm.get('email');
  }
  get password(){
    return this.loginForm.get('password');
  }
  get fullName(){
    return this.loginForm.get('fullName');
  }
  
  onSwitchMode(newMode) {   
    this.mode.emit(newMode);
    this.modeSelected = newMode;
  }
}
