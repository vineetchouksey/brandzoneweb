import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { WebService } from "../web.service";
 
@Injectable()
export class AuthGuard implements CanActivate {
 
    constructor(private router: Router,private auth:WebService) { }
 
    canActivate() {
        debugger;
        if (this.auth.isAuthenticated) {
            // logged in so return true
            return true;
        }
 
        // not logged in so redirect to login page
        this.router.navigate(['']);
        return false;
    }
}