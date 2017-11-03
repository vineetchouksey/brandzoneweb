import { Component, OnInit } from '@angular/core';
import { WebService } from "../web.service";
import { DataTableResource } from 'angular-4-data-table-bootstrap-4';
import { Router } from '@angular/router';
import { AlertsService } from "@jaspero/ng2-alerts";
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.css'],

  providers: [],
  
})
export class ProductlistComponent implements OnInit {
  items = [];
  itemResource = new DataTableResource(this.items);
  itemCount = 0;
  username: string;
  Authorization: any;
  productid: string;
  constructor(private WebService: WebService, private router: Router,private _alert: AlertsService) { }

  ngOnInit() {
    debugger;
    this.username = localStorage.getItem('username')
    this.Authorization = localStorage.getItem('token')
    this.WebService.getproductlist(this.Authorization).subscribe(products => {
      for (var i = (products.length - 1); i >= 0; i--) {
        debugger;
        this.items.push({ 'id': products[i]._id, 'productname': products[i].product.productname, 'manufacturer': products[i].product.manufacturer, 'price': products[i].product.price,'unit': products[i].unit, 'category': products[i].category.categorytype });
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

  getSavedSelections() {  }

  DeleteClicked(event) {
    this.productid = event.id;
    debugger;
    var obs = this.WebService.deleteproduct(this.productid, this.Authorization).flatMap(products => {
      this.items = [];
       this._alert.create('success', 'User removed successfully');
      return Observable.forkJoin([
        Observable.of(products),
        this.WebService.getproductlist(this.Authorization)
      ]);
    });
    obs.subscribe(
      (result) => {
        debugger;
        var interests = result[0];
        var selections = result[1];
        debugger;
        for (var i = (result[1].length - 1); i >= 0; i--) {
          debugger;
        this.items.push({ 'id': result[i].id, 'productname': result[i].product.productname, 'manufacturer': result[i].product.manufacturer, 'price': result[i].product.price,'unit': result[i].unit, 'category': result[i].category.categorytype });
        
        }
        this.itemResource = new DataTableResource(this.items);
        this.itemResource.query({}).then(items => result[1]);
        this.itemResource.count().then(count => this.itemCount = count);
      }
    );
  }

  Logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    this.router.navigateByUrl('');
  }

}
