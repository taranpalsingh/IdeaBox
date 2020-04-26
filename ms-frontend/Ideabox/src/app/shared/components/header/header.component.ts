import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userName = "Taran";
   
  constructor(
    private authService : AuthService
  ) { }

  ngOnInit() {
  }

  logout(){
    this.authService.logout();
  }

  searchUpdated(){
    
  }
}
