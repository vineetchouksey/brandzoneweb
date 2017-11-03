import { Component, OnInit } from '@angular/core';
import { WebService } from "../web.service";
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import { Router, ActivatedRoute } from '@angular/router';
//import { AlertsService } from "@jaspero/ng2-alerts";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login;
  loginData = {
    email: '',
    password: ''
}

  options = {
    overlay: true,
    overlayClickToClose: true,
    showCloseButton: true,
    duration: 5000
  }
  constructor(private WebService: WebService, private fb: FormBuilder, private router: Router) {
    this.login = fb.group({
      username: [''],
      password: [''],
    })
  }
  ngOnInit() {
  }
  // Login() {
  //   var email = this.login._value.username;
  //   var password = this.login._value.password;
  //   this.WebService.getLoginDetails(email, password).subscribe(users => {
  //     debugger;
  //     if (users.user.role === 'Admin' && users.token != '') {
  //       localStorage.setItem('token', users.token)
  //       localStorage.setItem('username', users.user.name)
  //       this.router.navigateByUrl('/customerlist');
  //     }
  //     else {
  //       this.login.reset();
  //     }
  //   });
  // }

  Login() {
        var email = this.login._value.username;
        var password = this.login._value.password;
    this.WebService.login(email, password);
}
}
