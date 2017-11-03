import { BrowserModule } from '@angular/platform-browser';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule,Routes }   from '@angular/router'
import { LoginComponent } from "./login/login.component";
import { WebService } from "./web.service";
import { HttpModule } from '@angular/http';
import { FormsModule,ReactiveFormsModule  }   from '@angular/forms';
import { CustomerlistComponent } from './customerlist/customerlist.component';
import { AuthGuard } from "./_guards/auth.guard";
import { JasperoAlertsModule } from '@jaspero/ng2-alerts';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { DataTableModule } from 'angular-4-data-table-bootstrap-4';
import { NavComponent } from './nav/nav.component';
import { ProductlistComponent } from './productlist/productlist.component'; 
import { MdMenuModule, MdIconModule, MdCardModule, MdButtonModule, MdToolbarModule, MdDialogModule } from "@angular/material";

const appRoutes: Routes = [
   {path:'',component:LoginComponent } ,
   {path:'customers', component:CustomerlistComponent, canActivate:[AuthGuard]},
   {path: 'products',component:ProductlistComponent, canActivate:[AuthGuard]}
];
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CustomerlistComponent,
    NavComponent,
    ProductlistComponent
  ],
  imports: [
    BrowserModule, HttpModule, FormsModule, ReactiveFormsModule, DataTableModule, JasperoAlertsModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule, MdMenuModule, MdIconModule, MdCardModule, MdButtonModule, MdToolbarModule, MdDialogModule
  ],
  providers: [WebService,AuthGuard],
  bootstrap: [AppComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }