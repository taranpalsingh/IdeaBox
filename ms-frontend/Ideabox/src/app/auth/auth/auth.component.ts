import { Component, OnInit, Output, EventEmitter, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService, AuthResponseData } from '../auth.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router'; 
import { AlertComponent } from 'src/app/UI/alert/alert.component';
import { PlaceholderDirective } from 'src/app/UI/placeholder.directive';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  isLoading = false;
  modeSelected = 'login';
  rememberMe: boolean = false;
  errorMessage: String;
  @Output() mode = new EventEmitter;

  // Validators for fullName Input for login 
  fullNameLoginValidators = []
  // Validators for fullName Input for Signup 
  fullNameSignupValidators = [ Validators.required]


  emailLoginValidators = [ Validators.required, 
    Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')  //validation for email's pattern
  ]
  emailSignupValidators = [ Validators.required, 
    Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')  //validation for email's pattern
  ]

  passwordLoginValidators = [ Validators.required]
  passwordSignupValidators = [ Validators.required, Validators.minLength(5)]

  loginForm = new FormGroup({
    fullName: new FormControl("",
        this.modeSelected==="signup" ? this.fullNameSignupValidators : this.fullNameLoginValidators 
    ),
    email: new FormControl("",
      this.modeSelected==="signup" ? this.emailSignupValidators : this.emailLoginValidators 
    ),
    password: new FormControl("",
      this.modeSelected==="signup" ? this.passwordSignupValidators : this.passwordLoginValidators 
    )
  },{
    updateOn: "submit" 
  });

  @ViewChild(PlaceholderDirective, {static: true}) alertHost : PlaceholderDirective; 
  closeSub : Subscription;

  constructor(
    private authServce: AuthService,
    private router : Router,
    private componentFactoryResolver: ComponentFactoryResolver
  ) { }

  ngOnInit() {
  }

  submitForm(){

    // Explicitly touching all the form controls for validation checks.
    this.loginForm.markAllAsTouched();
    
    if(!this.loginForm.valid){
      // console.log("invalid");
      return;
    }

    // turn the loader on
    this.isLoading = true;
    let authObs: Observable<AuthResponseData>;
    
    const credentials = {
      email: this.email.value,
      password: this.password.value
    }

    if(this.modeSelected === "login"){
      authObs = this.authServce.login(credentials, this.rememberMe)
    }
    else if(this.modeSelected === "signup"){
      credentials["fullName"] = this.fullName.value;
      authObs = this.authServce.signup(credentials, this.rememberMe)
    }

    // subscribe to login or signup requests
    authObs.subscribe(
      res => {
        this.isLoading = false;
        this.router.navigateByUrl("dashboard");
      },
      errorMsg => {
        this.isLoading = false;
        this.errorMessage = errorMsg;
      }
    )
  }

  updateRememberMe(){
    this.rememberMe = !this.rememberMe;
    console.log(this.rememberMe);
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
    if(newMode === 'login'){
      this.password.clearValidators();
      this.password.setValidators(this.passwordLoginValidators);
      
      this.email.clearValidators();
      this.email.setValidators(this.emailLoginValidators);

      this.fullName.clearValidators();
      this.fullName.setValidators(this.fullNameLoginValidators);
    }
    else{
      this.password.clearValidators();
      this.password.setValidators(this.passwordSignupValidators);
      
      this.email.clearValidators();
      this.email.setValidators(this.emailSignupValidators);

      this.fullName.clearValidators();
      this.fullName.setValidators(this.fullNameSignupValidators);
    }

  }

  // showError(message: string){
  //   const cmpFactoryresolver = this.componentFactoryResolver.resolveComponentFactory(
  //     AlertComponent
  //   );
  //   const hostContainerRef = this.alertHost.viewContainerRef;
  //   hostContainerRef.clear();

  //   const componentRef = hostContainerRef.createComponent(cmpFactoryresolver);
  //   componentRef.instance.message = message;
  //   this.closeSub = componentRef.instance.close.subscribe(() => {
  //     this.closeSub.unsubscribe();
  //     hostContainerRef.clear();
  //   })
  // }
}
