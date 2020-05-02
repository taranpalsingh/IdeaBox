import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService, AuthResponseData } from '../auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router'; 
import { confirmPasswordValidator } from '../Validators/confirmPassword.Validator';

@Component({
  selector: 'forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  isLoading = false;
  error = "";
  @Output() mode = new EventEmitter;

  form = new FormGroup({
    verificationKey: new FormControl(""),
    newPassword: new FormControl("",[
      Validators.required,
      Validators.minLength(5)
    ]),
    confirmPassword: new FormControl("",[
      Validators.required,
      confirmPasswordValidator('newPassword')
    ])
  },{
    updateOn: 'submit'
  });


  constructor(
    private authServce: AuthService,
    private router : Router
  ) { }

  ngOnInit() {

    // To compare the confirmPassword field whenever the value of newPassword is changed.
    // this.form.controls.newPassword.valueChanges.subscribe(() => {
    //   this.form.controls.confirmPassword.updateValueAndValidity()
    // })
  }

  submitForm(){

    // Explicitly touching all the form controls for validation checks.
    this.form.markAllAsTouched();
    
    if(!this.form.valid){
      console.log("invalid");
      return;
    }

    // turn the loader on
    this.isLoading = true;
    this.error = "";
    
    const passwordsObject = {
      verificationKey: this.verificationKey.value,
      newPassword: this.newPassword.value,
      confirmPassword: this.confirmPassword.value
    }

    // subscribe to login or signup requests
    this.authServce.forgotPassword(passwordsObject).subscribe(
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

  get verificationKey(){
    return this.form.get('verificationKey');
  }
  get newPassword(){
    return this.form.get('newPassword');
  }
  get confirmPassword(){
    return this.form.get('confirmPassword');
  }

}
