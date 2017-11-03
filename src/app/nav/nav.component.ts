import { Component, OnInit } from '@angular/core';
import { WebService } from "../web.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  username:any;
  menuItemsArray: any[] ;
  constructor(public auth:WebService,private router : Router) {
   }

  ngOnInit() {
   this.username = this.auth.name;// .getItem('username')
  }

  goToUsers(){
    this.router.navigate(['/customers']);
  }

  goToProducts(){
    this.router.navigate(['/products']);
  }

  Logout() {
    this.auth.logout(); 
  }
}
