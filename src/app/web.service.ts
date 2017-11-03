// import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';

@Injectable()
export class WebService {
    base_url = 'https://myfeedbackapp.herokuapp.com/api/';
    NAME_KEY = 'name';
    TOKEN_KEY = 'token'

    constructor(private http: Http, private router: Router) { }

    getLoginDetails(email: string, password: string) {
        var url = this.base_url + 'auth/login';
        let data = new URLSearchParams();
        data.append('email', email);
        data.append('password', password);
        return this.http.post(url, data).map(res => res.json());
    }

    get name() {
      return localStorage.getItem(this.NAME_KEY);
  }

  login(email: string, password: string) {
    let data = new URLSearchParams();
    data.append('email', email);
    data.append('password', password);
      this.http.post(this.base_url + 'auth/login', data).subscribe(res => {
          this.authenticate(res);
      })
  }

  logout() {
    localStorage.removeItem(this.NAME_KEY);
    localStorage.removeItem(this.TOKEN_KEY);
    this.router.navigate(['']);
}

authenticate(res) {
      var authResponse = res.json();

      if (!authResponse.token)
          return;

      localStorage.setItem(this.TOKEN_KEY, authResponse.token)
      localStorage.setItem(this.NAME_KEY, authResponse.user.name)
      this.router.navigate(['/customers']);
  }

  get isAuthenticated() {
      return !!localStorage.getItem(this.TOKEN_KEY);
  }

    getCustomerDetails(Authorization: string) {
        var url = this.base_url + 'users-list?Authorization=';
        var headers = new Headers({ 'Authorization': Authorization });
        var options = new RequestOptions({ headers: headers });
        let data = new URLSearchParams();
        data.append('Authorization', Authorization);
        return this.http.get(url, options).map(res => res.json());
    }

    deleteUser(userid: string, Authorization: string) {
        var url = this.base_url + 'users/' + userid;
        var headers = new Headers({ 'Authorization': Authorization });
        var options = new RequestOptions({ headers: headers });
        let data = new URLSearchParams();
        data.append('Authorization', Authorization);
        return this.http.delete(url, options).map(res => res.json());
    }

    getproductlist(Authorization: string) {
        var url = this.base_url + 'product-list?Authorization=';
        var headers = new Headers({ 'Authorization': Authorization });
        var options = new RequestOptions({ headers: headers });
        let data = new URLSearchParams();
        data.append('Authorization', Authorization);
        return this.http.get(url, options).map(res => res.json());
    }

    deleteproduct(producid: string, Authorization: string){
        var url = this.base_url + 'products/' + producid
        var headers = new Headers({'Authorization' : Authorization});
        var options = new RequestOptions({headers:headers});
        let data = new URLSearchParams();
        data.append('Authorization', Authorization);
        return this.http.delete(url, options).map(res => res.json());
    }

}