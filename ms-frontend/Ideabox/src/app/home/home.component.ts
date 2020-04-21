import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  authSubscribe: Subscription;
  isAuthenticated: boolean;
  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    
    this.authSubscribe = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;
    })
  }

  ngOnDestroy() {
    this.authSubscribe.unsubscribe();
  }

}
