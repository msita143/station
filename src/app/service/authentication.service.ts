import { Injectable,EventEmitter } from '@angular/core';
import { Headers, Http, Response } from "@angular/http";
import { Observable } from 'rxjs/Observable'
import { Router } from "@angular/router";
import 'rxjs/add/operator/map';

import { User } from "../shared/user";

@Injectable()
export class AuthenticationService {
    loggedUser:User;
    userListChanged = new EventEmitter<User>();
    constructor(private http: Http,private router:Router) { }

    authenticate(username:string,password:string){
        console.log("calling isAuthenticated..");    
        return this.http.get(`http://54.153.76.102:3000/api/Users/login?username=${username}`)
        .map((response: Response) => {
            if(response.json() && response.json()[0].username) {                 
                const resp = response.json()[0];
                this.loggedUser = new User(resp.id, resp.activestatus, resp.startdate, resp.enddate, resp.firstname,
                                           resp.lastname, resp.middleinitial, resp.displayname, resp.username,
                                           resp.password, resp.role, resp.cellPhoneNumber, resp.company, resp.jobtitleid,
                                           resp.faxnumber, resp.homephone, resp.officephoneNumber, resp.notificationmethod,
                                           resp.emailaddress, resp.servicecentercode, resp.truckcode, resp.workgroup,
                                           resp.createdby, resp.createddate, resp.updatedby, resp.updateddate
                                          );
                localStorage.setItem('currentUser', username);
                this.router.navigate(['/']);
            }
        });
    }
      
    isAuthenticated() {
        if (localStorage.getItem('currentUser')) {
            return true;
        }
        return false;
    }
      
    logout(){
        localStorage.removeItem('currentUser');
        this.router.navigate(['login']);
    }
    
    getUserInfo(username:string){
        console.log("calling getUserInfo");    
        return this.http.get(`http://54.153.76.102:3000/api/Users/login?username=${username}`)
        .map((response: Response) => {
            if(response.json() && response.json()[0].username) {                 
                const resp = response.json()[0];
                this.loggedUser = new User(resp.id, resp.activestatus, resp.startdate, resp.enddate, resp.firstname,
                                           resp.lastname, resp.middleinitial, resp.displayname, resp.username,
                                           resp.password, resp.role, resp.cellPhoneNumber, resp.company, resp.jobtitleid,
                                           resp.faxnumber, resp.homephone, resp.officephoneNumber, resp.notificationmethod,
                                           resp.emailaddress, resp.servicecentercode, resp.truckcode, resp.workgroup,
                                           resp.createdby, resp.createddate, resp.updatedby, resp.updateddate
                                          );
                
            }
        }).subscribe(
                () => {            
                    this.userListChanged.emit(this.loggedUser);
                }
        );  ;
    }
    getLoggedUser():User {
        if(this.loggedUser === undefined) {
           this.getUserInfo(localStorage.getItem('currentUser'));
      } else {       
            return this.loggedUser;
      }
    }
}
