import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../service/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private authentacionService:AuthenticationService) {}

  ngOnInit() {
  }
  
  isAuth() {
    return this.authentacionService.isAuthenticated();
  }

  onLogout() {
    this.authentacionService.logout();
  }
}
