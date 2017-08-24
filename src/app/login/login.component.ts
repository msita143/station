import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import {AlertService} from '../service/alert.service';
import {AuthenticationService} from '../service/authentication.service';
import { User } from "../shared/user";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authentacionService:AuthenticationService, private router: Router,private alertService: AlertService ) { 
      console.log("login.");
  }

  ngOnInit() {
      localStorage.removeItem('currentUser');
  }
  
  
  login(value){
      console.log(value);
      this.authentacionService.authenticate(value.userName,value.password)   
      .subscribe(
              () => this.router.navigate([''])
              /*function(response) { console.log("Success Response:" + response);this.router.navigate(['']);},
              function(error) { console.log("Error happened" + error);this.alertService.error(error);},
              function() { console.log("the subscription is completed")}*/
          );
       console.log("done Login..");
      
  }
 
  logout() {
      // remove user from local storage to log user out
      localStorage.removeItem('currentUser');
  }
  
  getLoggedUser():User {
      return this.authentacionService.getLoggedUser();
  }
}
