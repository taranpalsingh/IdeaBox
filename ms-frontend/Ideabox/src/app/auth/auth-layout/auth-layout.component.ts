import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.css']
})
export class AuthLayoutComponent implements OnInit {

  mode = 'login';

  modeUpdated(newMode){
    this.mode = newMode;
  }

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    if(this.router.url === '/forgotPassword'){
      this.modeUpdated('forgotPassword');
    }
  }

}
