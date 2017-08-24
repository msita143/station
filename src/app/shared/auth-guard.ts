import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Rx";
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';


@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean{
        if (localStorage.getItem('currentUser')) {
            console.log("User is Logged in....");
            return true;
        }
        console.log("User is not Loggedin....")
        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], '');
        return false;
    }
}

