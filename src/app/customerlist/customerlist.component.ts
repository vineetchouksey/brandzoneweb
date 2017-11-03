import { Component, OnInit } from '@angular/core';
import { WebService } from "../web.service";
import customer from './data';
import { DataTableResource } from 'angular-4-data-table-bootstrap-4';
import { Router } from '@angular/router';
import { AlertsService } from "@jaspero/ng2-alerts";
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-customerlist',
  templateUrl: './customerlist.component.html',
  styleUrls: ['./customerlist.component.css'],
  providers: [],
})
export class CustomerlistComponent implements OnInit {
  items = [];
  itemResource = new DataTableResource(this.items);
  itemCount = 0;
  username: string;
  Authorization: any;
  userid: string;
  constructor(private WebService: WebService, private router: Router,private _alert: AlertsService) {

  }

  ngOnInit() {
    debugger;
    this.username = localStorage.getItem('username')
    this.Authorization = localStorage.getItem('token')
    this.WebService.getCustomerDetails(this.Authorization).subscribe(users => {
      for (var i = (users.length - 1); i >= 0; i--) {
        debugger;
        this.items.push({ 'id': users[i]._id, 'name': users[i].profile.name, 'DOB': users[i].profile.dateOfBirth, 'email': users[i].email, 'gender': users[i].profile.gender, 'role': users[i].role });
      }
      this.itemResource = new DataTableResource(this.items);
      this.itemResource.count().then(count => this.itemCount = count);
      this.reloadItems({ offset: 0, limit: 10 });
    });
  }

  reloadItems(params) {
    this.itemResource.query(params).then(items => this.items = items);
  }

  rowClick(rowEvent) {
    console.log('Clicked: ' + rowEvent.row.item.name);
  }

  rowDoubleClick(rowEvent) {
    alert('Double clicked: ' + rowEvent.row.item.name);
  }

  rowTooltip(item) { return item.name; }

  EditClicked(event) {
    //alert(event.id);
  }
  getSavedSelections() {

  }
  DeleteClicked(event) {
    this.userid = event.id;
    
    // var obs = this.WebService.deleteUser(this.userid, this.Authorization).flatMap(users => {
    //   this.items = [];
    //    this._alert.create('success', 'User removed successfully');
    //   return Observable.forkJoin([
    //     Observable.of(users),
    //     this.WebService.getCustomerDetails(this.Authorization)
    //   ]);
    // });
    // obs.subscribe(
    //   (result) => {
    //     debugger;
    //     var interests = result[0];
    //     var selections = result[1];
    //     debugger;
    //     for (var i = (result[1].length - 1); i >= 0; i--) {
    //       this.items.push({ 'id': result[1][i]._id, 'name': result[1][i].profile.name, 'DOB': result[1][i].profile.dateOfBirth, 'email': result[1][i].email, 'gender': result[1][i].profile.gender, 'role': result[1][i].role });
    //     }
    //     this.itemResource = new DataTableResource(this.items);
    //     this.itemResource.query({}).then(items => result[1]);
    //     this.itemResource.count().then(count => this.itemCount = count);
    //   }
    // );
  }

  Logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    this.router.navigateByUrl('');
  }
}
